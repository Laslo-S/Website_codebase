from django.contrib import admin
from django.contrib.auth.admin import UserAdmin # Import UserAdmin
from django.contrib.auth import get_user_model # Import get_user_model
from django.contrib.auth.models import Group # Import Group model

# Import the project model from the core app
from apps.core.models import VisualizationProject

User = get_user_model()

# Define an inline admin descriptor for VisualizationProject
class VisualizationProjectInline(admin.TabularInline):
    model = VisualizationProject
    fk_name = 'owner' # Explicitly state the foreign key field name
    # Simplified fields for the inline view
    fields = ('title', 'project_type')
    # readonly_fields = () # No longer needed as created_at is removed
    extra = 1 # Show one empty form by default
    ordering = ('-created_at',) # Order inline projects by creation date
    verbose_name = "Project"
    verbose_name_plural = "Owned Projects"
    # Optional: Add link to change form if needed, requires defining get_edit_link
    # show_change_link = True

# Define a new User admin
class CustomUserAdmin(UserAdmin):
    # Base fieldsets definition (excluding groups, including user_permissions initially)
    BASE_FIELDSETS = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser',
                                 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    # Base readonly fields
    BASE_READONLY_FIELDS = ('last_login', 'date_joined')

    # Keep the standard UserAdmin structure and add the inline
    inlines = (VisualizationProjectInline,)
    # You can customize list_display, fieldsets etc. of UserAdmin here if needed
    # For example, add 'date_joined' to list_display if desired:
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser')
    search_fields = ('username', 'first_name', 'last_name', 'email')
    list_filter = ('is_staff', 'is_superuser', 'is_active')

    def get_readonly_fields(self, request, obj=None):
        """Make staff/superuser/permissions readonly except for superuser editing self."""
        readonly = list(self.BASE_READONLY_FIELDS)
        if obj and obj == request.user and request.user.is_superuser:
            # Superuser editing themselves - allow editing all basic permissions
            return tuple(readonly)
        else:
            # Non-superuser, or superuser editing others/adding new
            # Make staff, superuser status, and permissions readonly
            readonly.extend(['is_staff', 'is_superuser', 'user_permissions'])
            return tuple(readonly)

    def get_fieldsets(self, request, obj=None):
         """Show simplified Permissions section unless superuser edits self."""
         if obj and obj == request.user and request.user.is_superuser:
             # Superuser editing self: Show full original fieldsets
             # Need to fetch default UserAdmin fieldsets if not explicitly defined above
             # Re-defining BASE_FIELDSETS here for clarity matching UserAdmin defaults
             self.fieldsets = (
                 (None, {'fields': ('username', 'password')}),
                 ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
                 ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser',
                                          'user_permissions')}),
                 ('Important dates', {'fields': ('last_login', 'date_joined')}),
             )
             return super().get_fieldsets(request, obj)
         else:
             # Non-superuser, or superuser editing others/adding new
             # Show only 'is_active' in the Permissions section
             simplified_fieldsets = (
                 (None, {'fields': ('username', 'password')}),
                 ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
                 ('Permissions', {'fields': ('is_active',)}), # Simplified
                 ('Important dates', {'fields': self.BASE_READONLY_FIELDS}), # Use readonly here
             )
             return simplified_fieldsets

    # Prevent non-superusers from deleting users
    def has_delete_permission(self, request, obj=None):
        if not request.user.is_superuser:
            return False
        # Superuser can delete anyone except themselves (usually)
        if obj and obj == request.user:
             return False
        return super().has_delete_permission(request, obj)

# Re-register UserAdmin
admin.site.unregister(User) # Unregister the default User admin
admin.site.register(User, CustomUserAdmin) # Register User with the custom admin

# Unregister the Group model
try:
    admin.site.unregister(Group)
except admin.sites.NotRegistered:
    pass # Avoid error if it wasn't registered in the first place
