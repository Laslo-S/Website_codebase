from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from django.urls import reverse, NoReverseMatch
from django.utils.html import format_html
from django.utils.safestring import mark_safe

# Import the REAL admin logic from core app
from apps.core.admin import ClientDeliverableAdmin
# Import the PROXY model from this app
from .models import ClientDeliverableAdminView

User = get_user_model()

# Define the custom User admin
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'user_page_list_link') # Added user page link
    search_fields = ('username', 'first_name', 'last_name', 'email')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups') # Added groups filter
    
    # Base fieldsets definition (used by get_fieldsets)
    base_fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name", "email")}),
        ("Permissions and Groups", { 
            "fields": (
                "is_active",
                "is_staff",
                "is_superuser",
                "groups",
                "user_permissions",
            ),
             "classes": ("collapse",), 
        }),
        # Add user page link here, always visible
        ('User Page', {'fields': ('get_user_page_link',)}), 
    )
    
    # Updated readonly fields - removed preview link method
    readonly_fields = ('last_login', 'date_joined', 'get_user_page_link', 'display_client_deliverables') 
    inlines = [] # Ensure no inlines are present

    # Override get_fieldsets to conditionally add sections for Active Clients
    def get_fieldsets(self, request, obj=None):
        fieldsets = list(self.base_fieldsets) # Start with base fieldsets
        if obj and obj.groups.filter(name='Active Clients').exists():
            # If user is in the group, add the client-specific sections
            fieldsets.append((
                "Important dates", {
                    'fields': ('last_login', 'date_joined'), 
                    'classes': ('collapse',)
                }
            ))
            fieldsets.append((
                'Client Deliverables List', {
                    'fields': ('display_client_deliverables',),
                    'classes': (),
                }
            ))
        return tuple(fieldsets) # Return as tuple

    def get_user_page_link(self, obj):
        if obj.username:
            try:
                url = reverse("accounts:user_page", kwargs={"username": obj.username})
                return format_html('<a href="{url}" target="_blank">View User Page</a>', url=url)
            except NoReverseMatch:
                return "N/A (URL error)"
        return "N/A"
    get_user_page_link.short_description = "User Page Link"

    # Method for list display link
    def user_page_list_link(self, obj):
        # Check if user is in 'Active Clients' group
        is_client = obj.groups.filter(name='Active Clients').exists()
        if is_client:
            return self.get_user_page_link(obj) # Reuse the existing method to get link HTML
        else:
            # Apply smaller font size to the N/A text using inline style
            return format_html('<span style="font-size: 0.8em; color: #888;">N/A (Not in Active Clients group)</span>')
    user_page_list_link.short_description = "User Page" # Column header

    # Method to display client deliverables
    def display_client_deliverables(self, obj):
        deliverables = obj.deliverables.all().order_by('-created_at')
        if not deliverables.exists():
            html = "<p>No deliverables assigned to this client.</p>"
        else:
            html_list = "<ul>"
            for deliverable in deliverables:
                try:
                    # Link to the specific deliverable change page
                    # Note: We need the *actual* admin URL name. Since ClientDeliverableAdmin is
                    # registered via a proxy (ClientDeliverableAdminView), the URL name is likely
                    # 'admin:accounts_clientdeliverableadminview_change'
                    change_url = reverse('admin:accounts_clientdeliverableadminview_change', args=[deliverable.pk])
                    html_list += format_html(
                        '<li><a href="{url}">{title}</a> (Status: {status})</li>',
                        url=change_url,
                        title=deliverable.title,
                        status=deliverable.get_status_display()
                    )
                except NoReverseMatch:
                     html_list += format_html('<li>{} (Status: {}) - Link error</li>', deliverable.title, deliverable.get_status_display())
                    
            html_list += "</ul>"
            html = html_list
        
        # Add help text
        help_text = "<p style='margin-top: 10px; font-style: italic; color: #666;'>To add or edit deliverables, go to Client Management & Auth > Client Deliverables.</p>"
        # Use mark_safe to allow HTML rendering
        return mark_safe(html + help_text)
    display_client_deliverables.short_description = "Assigned Deliverables" 

# Register the PROXY model using the admin logic class from the CORE app
admin.site.register(ClientDeliverableAdminView, ClientDeliverableAdmin)

# Unregister the default User admin before registering the custom one
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
