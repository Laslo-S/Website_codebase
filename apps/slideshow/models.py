from django.db import models
from django.utils.html import format_html # Needed for admin thumbnail

class SlideshowImage(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]

    image = models.ImageField(upload_to='slideshow/') # Required
    alt_text = models.CharField(
        max_length=255, 
        blank=True, 
        help_text="Descriptive text for screen readers (optional but recommended)."
    )
    status = models.CharField(
        max_length=10, 
        choices=STATUS_CHOICES, 
        default='draft', 
        db_index=True
    )
    slideshow_order = models.PositiveIntegerField(
        default=0, 
        help_text="Order in slideshow (lower numbers appear first)."
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['slideshow_order', '-uploaded_at']
        verbose_name = "Slideshow Image"
        verbose_name_plural = "Slideshow Images"

    def __str__(self):
        if self.alt_text:
            return self.alt_text
        if self.image:
            return self.image.name.split('/')[-1] # Return filename
        return f"Slideshow Image {self.pk}"
    
    # Optional: Method for admin thumbnail
    def image_thumbnail(self):
        if self.image:
            return format_html('<img src="{}" width="100" height="60" style="object-fit: cover;"/>', self.image.url)
        return "No Image"
    image_thumbnail.short_description = 'Thumbnail'
