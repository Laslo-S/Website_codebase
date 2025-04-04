from django.urls import path
from .views import HomePageView, AboutPageView, ContactPageView

app_name = 'core' # Define an app namespace

urlpatterns = [
    path('', HomePageView.as_view(), name='home'), # Map root of the app to HomePageView
    path('about/', AboutPageView.as_view(), name='about'), # Add About page route
    path('contact/', ContactPageView.as_view(), name='contact'), # Add Contact page route
] 