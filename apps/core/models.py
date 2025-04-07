from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.urls import reverse

User = get_user_model()

# Create your models here.

# Removed VisualizationType model
# class VisualizationType(models.Model):
#     ...

# NEW MODELS
class PublicPortfolioItem(models.Model):
    VISUALIZATION_TYPES = [
        ('scan', '3D Scan'),
        ('video', 'Video Visualization'),
        ('still', 'Still Image'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    project_type = models.CharField(
        max_length=10,
        choices=VISUALIZATION_TYPES,
        default='still',
        db_index=True # Required index
    )
    embed_code = models.TextField(blank=True)
    image = models.ImageField(upload_to='portfolio/', blank=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True) # Auto-generated
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Public Portfolio Item"
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
            # Ensure slug uniqueness
            original_slug = self.slug
            num = 1
            while PublicPortfolioItem.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
                self.slug = f'{original_slug}-{num}'
                num += 1
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        # Placeholder: Implement detail view later
        return "#"

class ClientDeliverable(models.Model):
    DELIVERABLE_TYPES = [
        ('scan', '3D Scan'),
        ('video', 'Video Visualization'),
        ('still', 'Still Image'),
        ('other', 'Other Deliverable'),
    ]

    client = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='deliverables', # For reverse lookup user.deliverables.all()
        db_index=True # Required index
    )
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    project_type = models.CharField(
        max_length=10,
        choices=DELIVERABLE_TYPES,
        default='other'
    )
    embed_code = models.TextField(blank=True)
    image = models.ImageField(upload_to='client_deliverables/%Y/%m/%d/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Client Deliverable"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.client.username} - {self.title}"

# Managers for Proxy Models
class PublicScanManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(project_type='scan')

class PublicVideoManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(project_type='video')

class PublicStillManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(project_type='still')

# Proxy Models for Admin Organization
class PublicScanItem(PublicPortfolioItem):
    objects = PublicScanManager()
    class Meta:
        proxy = True
        verbose_name = "Public 3D Scan"
        verbose_name_plural = "Public 3D Scans"

class PublicVideoItem(PublicPortfolioItem):
    objects = PublicVideoManager()
    class Meta:
        proxy = True
        verbose_name = "Public Video Visualization"
        verbose_name_plural = "Public Videos"

class PublicStillItem(PublicPortfolioItem):
    objects = PublicStillManager()
    class Meta:
        proxy = True
        verbose_name = "Public Still Image"
        verbose_name_plural = "Public Stills"
