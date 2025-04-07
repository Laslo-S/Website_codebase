from django.contrib import admin
from django.utils.html import format_html
from .models import NewsPost
from django_ckeditor_5.widgets import CKEditor5Widget

@admin.register(NewsPost)
class NewsPostAdmin(admin.ModelAdmin):
    list_display = ('formatted_title', 'slug', 'status', 'published_at', 'updated_at')
    list_filter = ('status', 'published_at', 'created_at')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_at'
    readonly_fields = ('published_at', 'created_at', 'updated_at') # Make auto-set fields readonly
    list_editable = ('status',) # Allow quick status changes from list view
    # Optional: Customize fieldsets for better form layout
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'status', 'featured_image')
        }),
        ('Content', {
            'fields': ('content',)
        }),
        ('Timestamps', {
            'fields': ('published_at', 'created_at', 'updated_at'),
            'classes': ('collapse',) # Collapse date section by default
        }),
    )
    # Add custom actions if needed for bulk status changes
    # actions = ['publish_selected', 'mark_draft']

    # Add preview link later
    # readonly_fields = ('published_at', 'created_at', 'updated_at', 'view_on_site_link')
    # def view_on_site_link(self, obj):
    #    ...

    def formatted_title(self, obj):
        if obj.status == 'draft':
            # Make draft titles bold and yellowish text
            return format_html('<strong style="color: #DAA520; font-weight: bold;">{}</strong>', obj.title)
        return obj.title
    formatted_title.short_description = 'Title' # Set column header
    formatted_title.admin_order_field = 'title' # Allow sorting by original title field
