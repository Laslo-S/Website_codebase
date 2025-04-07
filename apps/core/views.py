from django.shortcuts import render
from django.views.generic import TemplateView, ListView, DetailView # Add DetailView
# Corrected import: Import base model AND proxy models
from .models import PublicPortfolioItem, PublicScanItem, PublicVideoItem, PublicStillItem
from apps.news.models import NewsPost # Import NewsPost
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your views here.

class HomePageView(TemplateView):
    template_name = "core/home.html"

    def get_context_data(self, **kwargs):
        # Removed project query - projects are now on dedicated pages
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Architectural Visualization Showcase"
        # Fetch latest News Posts using the correct status string
        try:
            # Use 'published' string directly as defined in STATUS_CHOICES
            context['latest_posts'] = NewsPost.objects.filter(status='published').order_by('-published_at')[:3]
        except Exception as e:
            # Log error maybe, but prevent homepage from crashing if blog fails
            print(f"Error fetching latest posts: {e}") # Basic print logging
            context['latest_posts'] = None
        return context

# --- Views for Dedicated Project Type Pages --- 

# Base view for common list functionality
class BaseProjectListView(ListView):
    # model = PublicPortfolioItem # Base model - subclasses override this
    context_object_name = 'portfolio_items'
    paginate_by = 12
    template_name = 'core/_project_list_base.html' # Fallback template

    def get_queryset(self):
        # Explicitly use the model defined on the specific view (e.g., PublicStillItem)
        # The manager attached to the proxy model handles the type filtering.
        queryset = self.model.objects.all() # Use the specific model's manager
        # Add status filter later in Phase 13
        # Add public filter if needed (assuming all portfolio items are public for now)
        # queryset = queryset.filter(is_public=True)
        return queryset.order_by('-created_at') # Ensure consistent ordering

    def get_template_names(self):
        # Determine template based on the actual model being listed (via proxy)
        if hasattr(self, 'project_type') and self.project_type:
            return [f'core/project_list_{self.project_type}s.html', self.template_name]
        return [self.template_name]

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Define page title based on project_type if available
        title_map = {'scan': '3D Scans', 'video': 'Video Visualizations', 'still': 'Still Images'}
        context['page_title'] = title_map.get(getattr(self, 'project_type', None), "Portfolio Items")
        return context

# Specific list views inheriting from the base
# These now primarily define the project_type for template/title logic
# The queryset filtering is handled by the Managers attached to the Proxy Models in models.py
class ScanListView(BaseProjectListView):
    project_type = 'scan'
    model = PublicScanItem # Point to the correct proxy model

class VideoListView(BaseProjectListView):
    project_type = 'video'
    model = PublicVideoItem # Point to the correct proxy model

class StillListView(BaseProjectListView):
    project_type = 'still'
    model = PublicStillItem # Point to the correct proxy model

# --- View for Project Detail Page --- 

class ProjectDetailView(DetailView):
    """ Displays a single visualization project. """
    model = PublicPortfolioItem
    template_name = 'core/project_detail.html'
    context_object_name = 'item'
    slug_field = 'slug' # Field in the model to match against the slug URL kwarg
    slug_url_kwarg = 'slug' # Name of the slug argument in the URL pattern

    def get_queryset(self):
        # Allow viewing only public projects via the detail URL
        return super().get_queryset().filter(is_public=True)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Set the page title dynamically based on the project title
        context['page_title'] = self.object.title
        # Optional: Add related projects or other context later
        return context

# --- Standard Static Pages --- 

class AboutPageView(TemplateView):
    template_name = "core/about.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "About Us"
        return context

class ContactPageView(TemplateView):
    template_name = "core/contact.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Contact Us"
        return context
