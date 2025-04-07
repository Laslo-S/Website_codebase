from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import NewsPost
from .serializers import NewsPostCreateSerializer
from rest_framework import generics, permissions
from rest_framework.authentication import SessionAuthentication # Consider if needed
from rest_framework_simplejwt.authentication import JWTAuthentication
from .permissions import IsNewsAgent # Import the custom permission


class NewsListView(ListView):
    """ Displays a list of published news posts. """
    model = NewsPost
    template_name = 'news/news_list.html' # Path within templates directory
    context_object_name = 'posts'
    paginate_by = 10 # Display 10 posts per page

    def get_queryset(self):
        queryset = super().get_queryset()
        # Filter by status based on preview mode
        if not getattr(self.request, 'is_preview', False):
            queryset = queryset.filter(status='published')
        # In preview mode, show draft and published (adjust if other statuses needed)
        else:
            queryset = queryset.filter(status__in=['draft', 'published'])

        return queryset.order_by('-published_at', '-created_at')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Latest News"
        return context

class NewsDetailView(DetailView):
    """ Displays a single news post. """
    model = NewsPost
    template_name = 'news/news_detail.html' # Path within templates directory
    context_object_name = 'post'
    slug_field = 'slug' # Field in the model to match against the slug URL kwarg
    slug_url_kwarg = 'slug' # Name of the slug argument in the URL pattern

    def get_queryset(self):
        queryset = super().get_queryset()
        # Filter by status based on preview mode
        if not getattr(self.request, 'is_preview', False):
            queryset = queryset.filter(status='published')
        # In preview mode, allow viewing draft and published via direct URL
        else:
            queryset = queryset.filter(status__in=['draft', 'published'])
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Set the page title dynamically based on the post title
        context['page_title'] = self.object.title
        return context

class NewsPostCreateAPIView(generics.CreateAPIView):
    queryset = NewsPost.objects.all()
    # Use the specific serializer for NewsPost creation
    serializer_class = NewsPostCreateSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsNewsAgent]

    # No perform_create override needed, serializer/model handle defaults

    # Optional: Add rate limiting specifically for this view if needed,
    # otherwise it uses the default DRF settings.
    # throttle_classes = [...] 
