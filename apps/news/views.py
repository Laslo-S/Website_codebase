from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import NewsPost, Article
from .serializers import ArticleSerializer
from rest_framework import generics, permissions
from rest_framework.authentication import SessionAuthentication # Consider if needed
from rest_framework_simplejwt.authentication import JWTAuthentication


class NewsListView(ListView):
    """ Displays a list of published news posts. """
    model = NewsPost
    template_name = 'news/news_list.html' # Path within templates directory
    context_object_name = 'posts'
    paginate_by = 5 # Display 5 posts per page

    def get_queryset(self):
        # Return only published posts, ordered by most recent published date
        return super().get_queryset().filter(status='published').order_by('-published_at')

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
        # Allow viewing only published posts via the detail URL
        return super().get_queryset().filter(status='published')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Set the page title dynamically based on the post title
        context['page_title'] = self.object.title
        return context

class ArticleCreateAPIView(generics.CreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    authentication_classes = [JWTAuthentication] # Primarily use JWT for API access
    permission_classes = [permissions.IsAuthenticated] # Only authenticated users can create

    # The serializer already handles setting the author from the request context
    # No need to override perform_create unless more complex logic is needed

    # Optional: Add rate limiting specifically for this view if needed,
    # otherwise it uses the default DRF settings.
    # throttle_classes = [...] 
