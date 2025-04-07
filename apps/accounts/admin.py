from django.contrib import admin
from django.contrib.auth.admin import UserAdmin # Import UserAdmin
from django.contrib.auth import get_user_model # Import get_user_model
from django.contrib.auth.models import Group # Import Group model
from django.urls import reverse, NoReverseMatch
from django.utils.html import format_html

# Import the REAL admin logic from core app
from apps.core.admin import ClientDeliverableAdmin
# Import the PROXY model from this app
from .models import ClientDeliverableAdminView

# Import the project model from the core app
# from apps.core.models import VisualizationProject

User = get_user_model()

# Define a new User admin (WITHOUT the decorator)
class CustomUserAdmin(UserAdmin):
    # Keep existing UserAdmin settings if any, or customize further
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser')
    search_fields = ('username', 'first_name', 'last_name', 'email')
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    fieldsets = UserAdmin.fieldsets + (
        ('Profile Links', {'fields': ('get_user_page_link',)}),
    )
    readonly_fields = ('last_login', 'date_joined', 'get_user_page_link')
    # REMOVE INLINES FROM HERE
    inlines = [] # No inlines needed here anymore

    def get_user_page_link(self, obj):
        if obj.username:
            try:
                url = reverse("accounts:user_page", kwargs={"username": obj.username})
                return format_html('<a href="{url}" target="_blank">View {username}\'s Page</a>', url=url, username=obj.username)
            except NoReverseMatch:
                return "N/A (URL not found)"
        return "N/A"
    get_user_page_link.short_description = "User Page Link"

# Register the PROXY model using the admin logic class from the CORE app
admin.site.register(ClientDeliverableAdminView, ClientDeliverableAdmin)

# Unregister the default User admin before registering the custom one
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

# # Unregister the Group model - We need this for agent permissions
# try:
#     admin.site.unregister(Group)
# except admin.sites.NotRegistered:
#     pass # Avoid error if it wasn't registered in the first place
