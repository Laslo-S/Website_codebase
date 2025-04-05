from django.db import models
# from django.contrib.auth import get_user_model # No longer needed
from django.utils.text import slugify
from django.utils import timezone
from django_ckeditor_5.fields import CKEditor5Field # Restore import
from django.contrib.auth.models import User

# User = get_user_model() # No longer needed

class NewsPost(models.Model):
    """ Represents a single news/blog post. """
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=255, unique=True, blank=True, help_text="Unique URL-friendly identifier, auto-generated from title if left blank.")
    featured_image = models.ImageField(upload_to='news_images/', null=True, blank=True, help_text="Optional featured image for the post.")
    content = CKEditor5Field('Content', config_name='default', blank=True, null=True) # Use CKEditor 5 field again
    # author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='news_posts') # Removed author field
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    published_at = models.DateTimeField(null=True, blank=True, help_text="Set automatically when status changes to 'Published'.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at', '-created_at']
        verbose_name = "News Post"
        verbose_name_plural = "News Posts"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Auto-generate slug if it's empty
        if not self.slug:
            self.slug = slugify(self.title)
            # Ensure slug uniqueness by appending count if necessary
            original_slug = self.slug
            queryset = NewsPost.objects.filter(slug__iexact=self.slug).exclude(pk=self.pk)
            counter = 1
            while queryset.exists():
                self.slug = f"{original_slug}-{counter}"
                queryset = NewsPost.objects.filter(slug__iexact=self.slug).exclude(pk=self.pk)
                counter += 1

        # Set published_at when status changes to published
        if self.status == 'published' and self.published_at is None:
            # Check if it's an existing instance being updated
            try:
                old_instance = NewsPost.objects.get(pk=self.pk)
                if old_instance.status != 'published':
                    self.published_at = timezone.now()
            except NewsPost.DoesNotExist:
                # New instance being created as published
                self.published_at = timezone.now()

        super().save(*args, **kwargs)

class Article(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=250, unique_for_date='publish_date')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='news_articles')
    # Use CKEditor 5 Field for rich text content
    content = CKEditor5Field('Content', config_name='default')
    publish_date = models.DateTimeField(default=timezone.now)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)

    class Meta:
        ordering = ('-publish_date',)
        indexes = [
            models.Index(fields=['-publish_date']),
        ]

    def __str__(self):
        return self.title

    # Consider adding get_absolute_url if you plan to have detail views for articles
    # def get_absolute_url(self):
    #     from django.urls import reverse
    #     return reverse('news:article_detail', args=[self.slug])
