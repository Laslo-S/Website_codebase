from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import TemplateView, DetailView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth import get_user_model # Import get_user_model
from django.contrib.auth.views import LoginView # Import LoginView
from django.urls import reverse_lazy, reverse, NoReverseMatch # Import reverse and NoReverseMatch
from django.template.loader import select_template, get_template # Import select_template and get_template
from django.template import TemplateDoesNotExist # Import TemplateDoesNotExist
from django.http import HttpResponseForbidden, Http404 # Import HttpResponseForbidden and Http404
import logging # Import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)

User = get_user_model()

# Create your views here.

class CustomLoginView(LoginView):
    """
    Custom login view to redirect users to their specific user page.
    """
    template_name = 'registration/login.html' # Use the same login template

    def get_success_url(self):
        """Redirect to the user-specific page after successful login."""
        logger.info("Attempting get_success_url...")
        url = None
        try:
            username = self.request.user.username
            logger.info(f"Username for redirect: {username}")
            if username:
                url = reverse('accounts:user_page', kwargs={'username': username})
                logger.info(f"Successfully reversed URL: {url}")
            else:
                logger.warning("Username is empty, cannot reverse URL.")
        except NoReverseMatch as e:
            logger.error(f"NoReverseMatch error in get_success_url: {e}")
        except Exception as e:
            logger.error(f"Unexpected error in get_success_url: {e}")

        # Fallback to default if URL resolution failed
        if url:
            return url
        else:
            logger.warning("get_success_url failed, falling back...")
            # Explicitly return the default profile URL as a fallback for clarity
            # This mimics the behavior we're seeing (fallback to /accounts/profile/)
            # when LOGIN_REDIRECT_URL is commented out.
            # In a real scenario, you might raise an error or redirect elsewhere.
            return reverse_lazy('accounts:profile')

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

# Updated UserPageView using DetailView and UserPassesTestMixin
class UserPageView(LoginRequiredMixin, UserPassesTestMixin, DetailView):
    model = User
    template_name = 'accounts/user_page.html' # Default fallback template
    slug_field = 'username'
    slug_url_arg = 'username'
    context_object_name = 'target_user'
    permission_denied_message = "You do not have permission to view this page."
    login_url = reverse_lazy('accounts:login') # Needed for LoginRequiredMixin

    def test_func(self):
        """Check if the requesting user is the target user or is staff."""
        # self.get_object() retrieves the user based on the username in the URL (due to DetailView)
        target_user = self.get_object()
        return self.request.user == target_user or self.request.user.is_staff

    def handle_no_permission(self):
        """Handle permission denied scenarios."""
        if not self.request.user.is_authenticated:
            return super().handle_no_permission() # Redirect to login
        return HttpResponseForbidden(self.get_permission_denied_message()) # Show 403

    def get_template_names(self):
        """Dynamically select template: user-specific or default."""
        target_user = self.get_object()
        username = target_user.username
        user_specific_template = f'accounts/user_templates/{username}.html'
        try:
            # Check if user-specific template exists
            # Note: Using template engine's get_template might be better for checking existence
            # but select_template works for returning a list as expected by get_template_names
            get_template(user_specific_template)
            logger.info(f"Using user-specific template: {user_specific_template}")
            return [user_specific_template, self.template_name]
        except TemplateDoesNotExist:
            logger.info(f"User-specific template not found for {username}, using default: {self.template_name}")
            return [self.template_name]

    def get_context_data(self, **kwargs):
        """Add client deliverables to the context."""
        context = super().get_context_data(**kwargs)
        target_user = self.get_object()
        deliverables_qs = target_user.deliverables.all()

        # Filter by status based on preview mode
        is_preview = getattr(self.request, 'is_preview', False)

        # Show all statuses if general preview is active
        if is_preview:
            pass 
        else:
            # Live mode: Only show 'published' deliverables
            deliverables_qs = deliverables_qs.filter(status='published')

        context['client_deliverables'] = deliverables_qs.order_by('-created_at')
        context['page_title'] = f"{target_user.username}'s Deliverables"
        logger.info(f"Fetched {context['client_deliverables'].count()} deliverables for user {target_user.username} (Preview: {is_preview})")
        return context
