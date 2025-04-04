from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import get_user_model # Import get_user_model
from django.contrib.auth.views import LoginView # Import LoginView
from django.urls import reverse_lazy # Import reverse_lazy
from django.template.loader import select_template # Import select_template
from django.template import TemplateDoesNotExist # Import TemplateDoesNotExist
from django.http import HttpResponseForbidden # Import HttpResponseForbidden

User = get_user_model()

# Create your views here.

class CustomLoginView(LoginView):
    """
    Custom login view to redirect users to their specific user page.
    """
    template_name = 'registration/login.html' # Use the same login template

    def get_success_url(self):
        """Redirect to the user-specific page after successful login."""
        # Use reverse_lazy to get the URL for the 'user_page' view,
        # passing the logged-in user's username as an argument.
        return reverse_lazy('accounts:user_page', kwargs={'username': self.request.user.username})

class UserProfileView(LoginRequiredMixin, TemplateView):
    """
    Displays the logged-in user's profile page.
    Requires user to be logged in.
    """
    template_name = "accounts/profile.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # The logged-in user object is automatically available in the
        # template context as 'user' when using LoginRequiredMixin
        # or if request context processor is enabled (which it is by default).
        context['page_title'] = f"{self.request.user.username}'s Profile"
        # Add any other profile-specific context data here later
        return context

class UserPageView(LoginRequiredMixin, TemplateView):
    """
    Displays a specific user's public-facing page, restricted to the user or staff.
    Fetches the user based on the username in the URL.
    Dynamically selects a template:
    1. Looks for 'accounts/user_templates/<username>.html'
    2. Falls back to 'accounts/user_page.html'
    Added LoginRequiredMixin and dispatch check for authorization.
    """
    login_url = reverse_lazy('accounts:login') # Required by LoginRequiredMixin
    permission_denied_message = "You do not have permission to view this page."

    def dispatch(self, request, *args, **kwargs):
        """Check if the logged-in user is the target user or staff."""
        # First, ensure the user is logged in (handled by LoginRequiredMixin)
        if not request.user.is_authenticated:
            return self.handle_no_permission()

        # Get the username from the URL kwargs
        username = self.kwargs.get('username')
        # Get the target user object
        target_user = get_object_or_404(User, username=username)

        # Check if the requesting user is the target user OR is staff
        if request.user == target_user or request.user.is_staff:
            # If authorized, proceed with the normal view dispatch
            return super().dispatch(request, *args, **kwargs)
        else:
            # If not authorized, return a Forbidden response
            return HttpResponseForbidden(self.permission_denied_message)

    def get_template_names(self):
        """Return a list of template names to search for.

        Checks for a user-specific template first, then falls back to default.
        """
        username = self.kwargs.get('username')
        # Construct the path for the user-specific template
        user_specific_template = f"accounts/user_templates/{username}.html"
        default_template = "accounts/user_page.html"

        # Django's template loader will try these in order
        return [user_specific_template, default_template]

    def get_context_data(self, **kwargs):
        """Add the target user to the context."""
        context = super().get_context_data(**kwargs)
        username = self.kwargs.get('username')
        target_user = get_object_or_404(User, username=username)
        context['target_user'] = target_user
        context['page_title'] = f"{target_user.username}'s Page"
        # Add user-specific content/data here later if needed
        # This context is available to both the default and custom templates.
        return context
