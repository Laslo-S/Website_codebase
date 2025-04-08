from django.contrib import admin
from .models import SlideshowImage
from django.utils.html import format_html

# Register your models here.
@admin.register(SlideshowImage)
class SlideshowImageAdmin(admin.ModelAdmin):
    list_display = ('display_status_thumbnail', 'alt_text', 'status', 'slideshow_order') # Use thumbnail highlighting method
    list_editable = ('status', 'slideshow_order') # Add status to editable fields
    ordering = ('slideshow_order', '-uploaded_at')
    list_filter = ('status',)
    search_fields = ('alt_text',)
    readonly_fields = ('image_thumbnail',)

    # Method for list display with conditional thumbnail styling
    def display_status_thumbnail(self, obj):
        thumbnail_html = obj.image_thumbnail()
        if thumbnail_html == "No Image":
            return thumbnail_html
        if obj.status == 'draft':
            # Wrap with a darker yellow background/border span if draft
            return format_html(
                '<span style="background-color: #facc15; padding: 2px; display: inline-block; border: 1px solid #eab308;">{}</span>',
                thumbnail_html
            )
        else:
            return thumbnail_html
    display_status_thumbnail.short_description = 'Thumbnail'

    # Method for readonly_fields thumbnail (no status styling needed here)
    def image_thumbnail(self, obj):
        return obj.image_thumbnail()
    image_thumbnail.short_description = 'Thumbnail'

    # Removed get_queryset override (not needed anymore)
