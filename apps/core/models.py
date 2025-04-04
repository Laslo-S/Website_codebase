from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.urls import reverse

User = get_user_model()

# Create your models here.

class VisualizationType(models.Model):
    """ Represents the type of visualization (e.g., 3D Scan, Video). """
    name = models.CharField(max_length=100, unique=True)
    # Consider adding a description field later if needed

    class Meta:
        verbose_name = "Visualization Type"
        verbose_name_plural = "Visualization Types"
        ordering = ['name']

    def __str__(self):
        return self.name

class VisualizationProject(models.Model):
    """ Represents a single visualization project. """
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    type = models.ForeignKey(
        VisualizationType,
        on_delete=models.PROTECT, # Prevent deleting a type if projects use it
        related_name='projects'
    )
    # Use TextField for potentially long iframe/embed code
    embed_code = models.TextField(blank=True, help_text="Paste iframe embed code here (for Sketchfab, Vimeo, etc.)")
    # Use ImageField for still images/thumbnails
    image = models.ImageField(upload_to='visualizations/images/', blank=True, null=True, help_text="Upload a still image or thumbnail.")
    slug = models.SlugField(max_length=255, unique=True, blank=True, help_text="Unique URL slug (auto-generated from title if left blank)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(
        User,
        on_delete=models.SET_NULL, # Keep project if user is deleted, set owner to NULL
        related_name='visualization_projects',
        null=True,  # Allow owner to be NULL in the database
        blank=True  # Allow owner to be blank in forms/admin
    )
    is_public = models.BooleanField(default=True, help_text="Is this project visible to the public?")

    class Meta:
        verbose_name = "Visualization Project"
        verbose_name_plural = "Visualization Projects"
        ordering = ['-created_at'] # Show newest first by default

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        """ Auto-generate slug from title if not provided. """
        if not self.slug:
            self.slug = slugify(self.title)
            # Ensure slug uniqueness (simple approach)
            original_slug = self.slug
            counter = 1
            while VisualizationProject.objects.filter(slug=self.slug).exists():
                self.slug = f'{original_slug}-{counter}'
                counter += 1
        super().save(*args, **kwargs)

    # Optional: Add a method to get the absolute URL for a project detail page later
    # def get_absolute_url(self):
    #     return reverse('core:project_detail', kwargs={'slug': self.slug})
