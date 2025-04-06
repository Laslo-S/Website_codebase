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
    # Keep the standard UserAdmin structure and add the inline
    inlines = (VisualizationProjectInline,)
    # You can customize list_display, fieldsets etc. of UserAdmin here if needed
    # For example, add 'date_joined' to list_display if desired:
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser')
    search_fields = ('username', 'first_name', 'last_name', 'email')
    list_filter = ('is_staff', 'is_superuser', 'is_active')

    # Omit get_readonly_fields and get_fieldsets for now

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

# # Unregister the Group model - We need this for agent permissions
# try:
#     admin.site.unregister(Group)
# except admin.sites.NotRegistered:
#     pass # Avoid error if it wasn't registered in the first place
