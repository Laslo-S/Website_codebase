from django.contrib import admin
from .models import VisualizationType, VisualizationProject

# Register your models here.

@admin.register(VisualizationType)
class VisualizationTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(VisualizationProject)
class VisualizationProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'owner', 'is_public', 'created_at', 'updated_at')
    list_filter = ('type', 'owner', 'is_public', 'created_at')
    search_fields = ('title', 'description', 'owner__username') # Search owner by username
    prepopulated_fields = {'slug': ('title',)} # Auto-generate slug from title
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'owner', 'type', 'is_public')
        }),
        ('Content', {
            'fields': ('description', 'embed_code', 'image')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',) # Make this section collapsible
        }),
    )

    # Optional: Customize how owner is displayed or selected if needed
    # raw_id_fields = ('owner',) # Use simple ID input instead of dropdown for many users
