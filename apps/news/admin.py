from django.contrib import admin
from .models import NewsPost
from django_ckeditor_5.widgets import CKEditor5Widget

@admin.register(NewsPost)
class NewsPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'published_at', 'created_at', 'updated_at')
    list_filter = ('status', 'published_at')
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
        ('Dates', {
            'fields': ('published_at', 'created_at', 'updated_at'),
            'classes': ('collapse',) # Collapse date section by default
        }),
    )
