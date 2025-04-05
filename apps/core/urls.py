from django.urls import path
from .views import (
    HomePageView, AboutPageView, ContactPageView,
    ScanListView, VideoListView, StillListView,
    ProjectDetailView # Import the new view
)

app_name = 'core' # Define an app namespace

urlpatterns = [
    path('', HomePageView.as_view(), name='home'), # Map root of the app to HomePageView
    path('about/', AboutPageView.as_view(), name='about'), # Add About page route
    path('contact/', ContactPageView.as_view(), name='contact'), # Add Contact page route

    # Dynamic project list pages
    path('scans/', ScanListView.as_view(), name='scan_list'),
    path('videos/', VideoListView.as_view(), name='video_list'),
    path('images/', StillListView.as_view(), name='still_list'),

    # Project Detail View
    path('projects/<slug:slug>/', ProjectDetailView.as_view(), name='project_detail'),
] 