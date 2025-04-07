from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.utils.html import format_html
# Import the base model and the new proxy models
from .models import PublicPortfolioItem, PublicScanItem, PublicVideoItem, PublicStillItem, ClientDeliverable

User = get_user_model()

# REMOVE OLD ADMIN
# @admin.register(VisualizationProject)
# class VisualizationProjectAdmin(admin.ModelAdmin):
#    ...

# Base Admin class for common settings (NOT registered)
class PublicPortfolioItemAdmin(admin.ModelAdmin):
    list_display = ('formatted_title', 'project_type', 'status', 'created_at', 'updated_at')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('project_type', 'status', 'created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'project_type', 'status')
        }),
        ('Content', {
            'fields': ('description', 'embed_code', 'image')
        }),
    )
    readonly_fields = ('project_type',)
    list_editable = ('status',)

    def formatted_title(self, obj):
        if obj.status == 'draft':
            # Make draft titles bold and yellowish text
            return format_html('<strong style="color: #DAA520; font-weight: bold;">{}</strong>', obj.title)
        return obj.title
    formatted_title.short_description = 'Title'
    formatted_title.admin_order_field = 'title'

# Specific Admins for Proxy Models (Registered)
@admin.register(PublicScanItem)
class PublicScanItemAdmin(PublicPortfolioItemAdmin):
    def save_model(self, request, obj, form, change):
        obj.project_type = 'scan'
        super().save_model(request, obj, form, change)

    def get_fieldsets(self, request, obj=None):
        fieldsets = super().get_fieldsets(request, obj)
        if obj is None: # If adding a new object (add form)
            # Filter out 'project_type' from the first fieldset's fields
            new_fieldsets = []
            for name, options in fieldsets:
                # Make a mutable copy of fields tuple
                fields = list(options.get('fields', []))
                if 'project_type' in fields:
                    fields.remove('project_type')
                # Create new options dict with modified fields
                new_options = options.copy()
                new_options['fields'] = tuple(fields)
                new_fieldsets.append((name, new_options))
            return new_fieldsets
        return fieldsets # Return original fieldsets for change view

@admin.register(PublicVideoItem)
class PublicVideoItemAdmin(PublicPortfolioItemAdmin):
    def save_model(self, request, obj, form, change):
        obj.project_type = 'video'
        super().save_model(request, obj, form, change)

    def get_fieldsets(self, request, obj=None):
        fieldsets = super().get_fieldsets(request, obj)
        if obj is None: # Add form
            new_fieldsets = []
            for name, options in fieldsets:
                fields = list(options.get('fields', []))
                if 'project_type' in fields:
                    fields.remove('project_type')
                new_options = options.copy()
                new_options['fields'] = tuple(fields)
                new_fieldsets.append((name, new_options))
            return new_fieldsets
        return fieldsets # Change view

@admin.register(PublicStillItem)
class PublicStillItemAdmin(PublicPortfolioItemAdmin):
    def save_model(self, request, obj, form, change):
        obj.project_type = 'still'
        super().save_model(request, obj, form, change)

    def get_fieldsets(self, request, obj=None):
        fieldsets = super().get_fieldsets(request, obj)
        if obj is None: # Add form
            new_fieldsets = []
            for name, options in fieldsets:
                fields = list(options.get('fields', []))
                if 'project_type' in fields:
                    fields.remove('project_type')
                new_options = options.copy()
                new_options['fields'] = tuple(fields)
                new_fieldsets.append((name, new_options))
            return new_fieldsets
        return fieldsets # Change view

# Admin for ClientDeliverable will be added in Task 12.5
# For now, just remove the old VisualizationProject import

# --- Client Deliverable Admin Configuration ---

class ClientFilter(admin.SimpleListFilter):
    title = 'Client' # Display name for the filter
    parameter_name = 'client_id' # URL parameter

    def lookups(self, request, model_admin):
        """
        Returns a list of tuples. The first element is the coded value
        for the option that will appear in the URL query. The second
        element is the human-readable name for the option that will
        appear in the right sidebar.
        Only shows users in the 'Active Clients' group.
        """
        try:
            client_group = Group.objects.get(name='Active Clients')
            clients = client_group.user_set.order_by('username')
            return [(user.id, user.username) for user in clients]
        except Group.DoesNotExist:
            return [] # No clients to filter by if group doesn't exist

    def queryset(self, request, queryset):
        """
        Returns the filtered queryset based on the value
        provided in the query string and retrievable via
        `self.value()`.
        """
        if self.value():
            return queryset.filter(client_id=self.value())
        return queryset

# Define the admin class BUT DO NOT REGISTER IT HERE
class ClientDeliverableAdmin(admin.ModelAdmin):
    list_display = ('formatted_title', 'client', 'project_type', 'status', 'created_at')
    list_filter = (ClientFilter, 'project_type', 'status')
    search_fields = ('title', 'description', 'client__username')
    autocomplete_fields = ['client']
    list_editable = ('status',)
    fieldsets = (
        (None, {
            'fields': ('client', 'title', 'project_type', 'status')
        }),
        ('Content', {
            'fields': ('description', 'embed_code', 'image')
        }),
    )
    
    def formatted_title(self, obj):
        if obj.status == 'draft':
            # Make draft titles bold and yellowish text
            return format_html('<strong style="color: #DAA520; font-weight: bold;">{}</strong>', obj.title)
        return obj.title
    formatted_title.short_description = 'Title'
    formatted_title.admin_order_field = 'title'

    # Add preview link later if user page acts as detail view
    # readonly_fields = ('view_on_site_link',)
    # def view_on_site_link(self, obj):
    #    ...
