from django.urls import path
from .views import HomePageView

app_name = 'core' # Define an app namespace

urlpatterns = [
    path('', HomePageView.as_view(), name='home'), # Map root of the app to HomePageView
] 