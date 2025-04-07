from django.shortcuts import render, redirect, get_object_or_404 # Added redirect, get_object_or_404
from django.views.generic import TemplateView, ListView, DetailView # Added DetailView
from .models import PublicPortfolioItem, PublicScanItem, PublicVideoItem, PublicStillItem
from apps.news.models import NewsPost # Import NewsPost
# Imports needed for preview toggle
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib import messages
from django.urls import reverse

# Create your views here.

class HomePageView(TemplateView):
    template_name = "core/home.html"

    def get_context_data(self, **kwargs):
        # Removed project query - projects are now on dedicated pages
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Architectural Visualization Showcase"
        try:
            # Add preview logic for latest posts
            if getattr(self.request, 'is_preview', False):
                context['latest_posts'] = NewsPost.objects.filter(status__in=['draft', 'published']).order_by('-published_at')[:3]
            else:
                context['latest_posts'] = NewsPost.objects.filter(status='published').order_by('-published_at')[:3]
        except Exception as e:
            # Log error maybe, but prevent homepage from crashing if blog fails
            print(f"Error fetching latest posts: {e}") # Basic print logging
            context['latest_posts'] = None
        return context

# --- Views for Dedicated Project Type Pages --- 

class BaseProjectListView(ListView):
    """ Base view for listing projects of a specific type. """
    model = PublicPortfolioItem
    context_object_name = 'portfolio_items' # Use 'portfolio_items' in the template loop
    paginate_by = 12 # Show 12 projects per page (adjust as needed)
    template_name = 'core/_project_list_base.html' # Fallback template

    def get_queryset(self):
        queryset = self.model.objects.all() 

        # Filter by status based on preview mode
        is_preview_active = getattr(self.request, 'is_preview', False)
        if not is_preview_active:
            queryset = queryset.filter(status='published')
        else:
            queryset = queryset.filter(status__in=['draft', 'published'])
            
        final_queryset = queryset.order_by('-created_at')
        return final_queryset

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

class ScanListView(BaseProjectListView):
    project_type = 'scan'
    model = PublicScanItem # Point to the correct proxy model

class VideoListView(BaseProjectListView):
    project_type = 'video'
    model = PublicVideoItem # Point to the correct proxy model

class StillListView(BaseProjectListView):
    project_type = 'still'
    model = PublicStillItem # Point to the correct proxy model

# --- View for Project Detail Page (Added Back) --- 

class ProjectDetailView(DetailView):
    model = PublicPortfolioItem # Use base model
    template_name = 'core/project_detail.html'
    context_object_name = 'item'
    slug_field = 'slug' 
    slug_url_kwarg = 'slug' 

    def get_queryset(self):
        queryset = super().get_queryset()
        # Filter by status based on preview mode for detail view access
        if not getattr(self.request, 'is_preview', False):
            queryset = queryset.filter(status='published')
        else:
            queryset = queryset.filter(status__in=['draft', 'published'])
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = self.object.title
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

# --- Admin Preview Control View (Added Back) ---

@staff_member_required
def toggle_preview_mode(request):
    """Toggles the preview mode session variable."""
    current_status = request.session.get('preview_mode_active', False)
    request.session['preview_mode_active'] = not current_status
    # Removed clearing of specific client ID as it's no longer used
    messages.success(request, f"Preview mode {'ACTIVATED' if not current_status else 'DEACTIVATED'}.")
    return redirect(request.META.get('HTTP_REFERER', reverse('admin:index')))

# REMOVED set_preview_client and clear_preview_client functions 