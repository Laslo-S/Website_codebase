from django.shortcuts import render
from django.views.generic import TemplateView, ListView # Import ListView
from .models import VisualizationProject
from apps.news.models import NewsPost # Import NewsPost

# Create your views here.

class HomePageView(TemplateView):
    template_name = "core/home.html"

    def get_context_data(self, **kwargs):
        # Removed project query - projects are now on dedicated pages
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Architectural Visualization Showcase"
        # Get latest 3 published news posts
        try:
            context['latest_posts'] = NewsPost.objects.filter(status='published').order_by('-published_at')[:3]
        except Exception as e:
            # Log error maybe, but prevent homepage from crashing if blog fails
            print(f"Error fetching latest posts: {e}") # Basic print logging
            context['latest_posts'] = None
        return context

# --- Views for Dedicated Project Type Pages --- 

class BaseProjectListView(ListView):
    """ Base view for listing projects of a specific type. """
    model = VisualizationProject
    context_object_name = 'projects' # Use 'projects' in the template loop
    paginate_by = 9 # Show 9 projects per page (adjust as needed)

    def get_queryset(self):
        # Filter by the project_type defined in subclasses
        # Only show public projects
        return super().get_queryset().filter(
            project_type=self.project_type, 
            is_public=True
        ).order_by('-created_at')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Add page-specific title to context
        context['page_title'] = self.page_title
        return context

class ScanListView(BaseProjectListView):
    template_name = "core/project_list_scans.html"
    project_type = VisualizationProject.TYPE_SCAN
    page_title = "3D Scans"

class VideoListView(BaseProjectListView):
    template_name = "core/project_list_videos.html"
    project_type = VisualizationProject.TYPE_VIDEO
    page_title = "Video Visualizations"

class StillListView(BaseProjectListView):
    template_name = "core/project_list_stills.html"
    project_type = VisualizationProject.TYPE_STILL
    page_title = "Still Images"

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
