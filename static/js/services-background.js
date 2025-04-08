import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js'; // TEMP: Uncommented

// console.log("services-background.js: Script loaded."); // Removed log

let scene, camera, renderer;
let modelGroup;
let mouseX = 0;
const clock = new THREE.Clock();

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

function readConfigFromCSS() {
    try {
        const rootStyles = window.getComputedStyle(document.documentElement);
        
        CAMERA_Z_POSITION = parseFloat(rootStyles.getPropertyValue('--sphere-camera-z').trim() || CAMERA_Z_POSITION);
        GEOMETRY_RADIUS = parseFloat(rootStyles.getPropertyValue('--sphere-geometry-radius').trim() || GEOMETRY_RADIUS);
        
        // Parse color, removing quotes if necessary and converting hex string to number
        const baseColorStr = rootStyles.getPropertyValue('--sphere-base-color').trim().replace(/['"]/g, '') || '#cccccc';
        BASE_COLOR = new THREE.Color(baseColorStr).getHex(); 
        const edgeColorStr = rootStyles.getPropertyValue('--sphere-edge-color').trim().replace(/['"]/g, '') || '#555555';
        EDGE_COLOR = new THREE.Color(edgeColorStr).getHex();

        BASE_OPACITY = parseFloat(rootStyles.getPropertyValue('--sphere-base-opacity').trim() || BASE_OPACITY);
        MOUSE_SENSITIVITY = parseFloat(rootStyles.getPropertyValue('--sphere-mouse-sensitivity').trim() || MOUSE_SENSITIVITY);
        ACCELERATION_FACTOR = parseFloat(rootStyles.getPropertyValue('--sphere-acceleration').trim() || ACCELERATION_FACTOR);
        VELOCITY_DAMPING = parseFloat(rootStyles.getPropertyValue('--sphere-damping').trim() || VELOCITY_DAMPING);

        // console.log("Sphere Config:", { CAMERA_Z_POSITION, GEOMETRY_RADIUS, BASE_COLOR, BASE_OPACITY, EDGE_COLOR, MOUSE_SENSITIVITY, ACCELERATION_FACTOR, VELOCITY_DAMPING });

    } catch (error) {
        console.error("Error reading sphere config from CSS:", error);
        // Fallback to defaults already assigned
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
    
    // Read configuration from CSS variables first
    readConfigFromCSS();

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

    const baseMaterial = new THREE.MeshBasicMaterial({
        color: BASE_COLOR,
        transparent: true,
        opacity: BASE_OPACITY,
        depthWrite: false // Good for transparent background overlays
    });
    const baseMesh = new THREE.Mesh(geometry, baseMaterial);
    modelGroup.add(baseMesh);

    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: EDGE_COLOR });
    const lineSegments = new THREE.LineSegments(edges, lineMaterial);
    modelGroup.add(lineSegments);

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
        modelGroup.rotation.y = currentRotationY;
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