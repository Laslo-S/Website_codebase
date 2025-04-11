import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js'; // TEMP: Uncommented
// Re-add imports for Fat Lines using LineSegmentsGeometry
import { LineMaterial } from 'https://unpkg.com/three@0.160.0/examples/jsm/lines/LineMaterial.js';
import { LineSegmentsGeometry } from 'https://unpkg.com/three@0.160.0/examples/jsm/lines/LineSegmentsGeometry.js';
import { LineSegments2 } from 'https://unpkg.com/three@0.160.0/examples/jsm/lines/LineSegments2.js';

// console.log("services-background.js: Script loaded."); // Removed log

let scene, camera, renderer;
let modelGroup;
let mouseX = 0;
const clock = new THREE.Clock();
let lineMaterial; // Make global again for resize updates

// --- Physics / Animation Variables ---
let currentRotationY = 0;
let angularVelocityY = 0;
let targetRotationY = 0;

// --- Configuration Variables (will be read from CSS) ---
let CAMERA_Z_POSITION = 3;
let GEOMETRY_RADIUS = 2;
let BASE_COLOR = 0xcccccc;
let BASE_OPACITY = 0.08;
let EDGE_COLOR = 0x555555; // Use numeric hex for Three.js color
let MOUSE_SENSITIVITY = 0.2;
let ACCELERATION_FACTOR = 0.6;
let VELOCITY_DAMPING = 0.92;
let LINE_WIDTH = 1.0; // Default if CSS fails
let INITIAL_ROTATION_Y = 0;
let SCALE = 1.0;

function readConfigFromCSS() {
    try {
        const rootStyles = window.getComputedStyle(document.documentElement);
        
        CAMERA_Z_POSITION = parseFloat(rootStyles.getPropertyValue('--sphere-camera-z').trim() || CAMERA_Z_POSITION);
        GEOMETRY_RADIUS = parseFloat(rootStyles.getPropertyValue('--sphere-geometry-radius').trim() || GEOMETRY_RADIUS);
        
        const baseColorStr = rootStyles.getPropertyValue('--sphere-base-color').trim().replace(/['"]/g, '') || '#cccccc';
        BASE_COLOR = new THREE.Color(baseColorStr).getHex(); 
        const edgeColorStr = rootStyles.getPropertyValue('--sphere-edge-color').trim().replace(/['"]/g, '') || '#555555';
        EDGE_COLOR = new THREE.Color(edgeColorStr).getHex();

        BASE_OPACITY = parseFloat(rootStyles.getPropertyValue('--sphere-base-opacity').trim() || BASE_OPACITY);
        MOUSE_SENSITIVITY = parseFloat(rootStyles.getPropertyValue('--sphere-mouse-sensitivity').trim() || MOUSE_SENSITIVITY);
        ACCELERATION_FACTOR = parseFloat(rootStyles.getPropertyValue('--sphere-acceleration').trim() || ACCELERATION_FACTOR);
        VELOCITY_DAMPING = parseFloat(rootStyles.getPropertyValue('--sphere-damping').trim() || VELOCITY_DAMPING);
        LINE_WIDTH = parseFloat(rootStyles.getPropertyValue('--sphere-line-width').trim() || LINE_WIDTH); // Read but ignored
        
        const initialRotationDegStr = rootStyles.getPropertyValue('--sphere-initial-rotation-y').trim().replace('deg', '') || '0';
        const initialRotationDeg = parseFloat(initialRotationDegStr);
        INITIAL_ROTATION_Y = initialRotationDeg * Math.PI / 180;

        SCALE = parseFloat(rootStyles.getPropertyValue('--sphere-scale').trim() || SCALE); // ADDED: Read scale

        // console.log("Sphere Config:", { ..., SCALE });

    } catch (error) {
        console.error("Error reading sphere config from CSS:", error);
    }
}


function init() {
    // console.log("services-background.js: Init function started."); // Removed log

    // Find the canvas
    const canvas = document.getElementById('servicesBackgroundCanvas');
    if (!canvas) {
        console.error('Services background canvas not found!');
        return; // Stop initialization if canvas is missing
    }
    
    readConfigFromCSS();

    // REMOVED DEBUG LOG
    // console.log("LINE_WIDTH read from CSS:", LINE_WIDTH);

    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = CAMERA_Z_POSITION;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); // Use the correct canvas, enable alpha
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Geometry and Materials using configured values
    const geometry = new THREE.IcosahedronGeometry(GEOMETRY_RADIUS, 1);
    modelGroup = new THREE.Group();
    scene.add(modelGroup);
    
    modelGroup.scale.set(SCALE, SCALE, SCALE);

    const baseMaterial = new THREE.MeshBasicMaterial({
        color: BASE_COLOR,
        transparent: true,
        opacity: BASE_OPACITY,
        depthWrite: false // Good for transparent background overlays
    });
    const baseMesh = new THREE.Mesh(geometry, baseMaterial);
    modelGroup.add(baseMesh);

    // --- Updated Fat Lines Implementation (Edges + LineSegmentsGeometry) --- 
    const edges = new THREE.EdgesGeometry(geometry);
    const lineGeometry = new LineSegmentsGeometry();
    lineGeometry.setPositions(edges.attributes.position.array);

    lineMaterial = new LineMaterial({
        color: EDGE_COLOR,
        linewidth: LINE_WIDTH,
        resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
        dashed: false,
        alphaToCoverage: true,
    });

    const lineSegments2 = new LineSegments2(lineGeometry, lineMaterial);
    lineSegments2.computeLineDistances();
    lineSegments2.scale.set(1, 1, 1); // Scale applied to parent group
    modelGroup.add(lineSegments2);
    // --- End Updated Fat Lines --- 

    // --- Apply Initial Rotation ---
    modelGroup.rotation.y = INITIAL_ROTATION_Y;

    // Event Listeners
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseleave', onMouseLeave, false);

    // Start animation loop
    animate();
}

function onWindowResize() {
    if (!camera || !renderer) return; // Check if initialized
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Re-add update LineMaterial resolution
    if (lineMaterial) { 
        lineMaterial.resolution.set(window.innerWidth, window.innerHeight);
    }
}

function onMouseMove(event) {
    // Calculate mouse position relative to the window (-1 to 1)
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
}

function onMouseLeave() {
     // Gently reset target influence towards center when mouse leaves
     // Instead of snapping, let the damping handle the slowdown
     mouseX = mouseX * 0.5; // Reduce target influence gradually
}


function animate() {
    requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.05); // Cap delta time

    // Update Target Rotation based on mouse
    targetRotationY = mouseX * MOUSE_SENSITIVITY;

    // --- Inertia Physics ---
    let rotationDifference = targetRotationY - currentRotationY;
    // Keep difference within reasonable bounds if needed, e.g., using THREE.MathUtils.lerp for smoother target following
    
    const acceleration = rotationDifference * ACCELERATION_FACTOR;
    angularVelocityY += acceleration * delta;
    angularVelocityY *= VELOCITY_DAMPING; // Apply friction

    // Prevent tiny residual velocity to eventually stop completely
    if (Math.abs(angularVelocityY) < 0.0001 && Math.abs(rotationDifference) < 0.001) {
         angularVelocityY = 0;
         // Optionally snap to target if very close and velocity is near zero
         // currentRotationY = targetRotationY; 
    }

    currentRotationY += angularVelocityY * delta;

    // --- Apply Rotation to Model ---
    if (modelGroup) {
        // Add the initial offset to the physics-driven rotation
        modelGroup.rotation.y = INITIAL_ROTATION_Y + currentRotationY; 
        // Optionally add slight rotation on other axes for more visual interest
        // modelGroup.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.05; 
    }
    
    // Render the scene
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Wait for the DOM to be ready before initializing
document.addEventListener('DOMContentLoaded', () => {
    // console.log("services-background.js: DOMContentLoaded event fired."); // Removed log
    init();
}); 