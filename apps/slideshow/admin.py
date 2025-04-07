from django.contrib import admin
from .models import SlideshowImage
from django.utils.html import format_html

# Register your models here.
@admin.register(SlideshowImage)
class SlideshowImageAdmin(admin.ModelAdmin):
    # list_display = ('title', 'project_type', 'status') # Keep commented out
    list_display = ('image_thumbnail', 'alt_text', 'status', 'slideshow_order') # New display fields
    list_editable = ('slideshow_order',)
    ordering = ('slideshow_order', '-uploaded_at') # Use new model fields
    list_filter = ('status',) # Filter only by status
    search_fields = ('alt_text',) # Search by alt text

    # Readonly field for thumbnail display
    readonly_fields = ('image_thumbnail',)

    # Method to display thumbnail (already defined in model, but needed for readonly_fields)
    def image_thumbnail(self, obj):
        return obj.image_thumbnail()
    image_thumbnail.short_description = 'Thumbnail'

    # Removed get_queryset override (not needed anymore)
