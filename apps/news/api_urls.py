from django.urls import path
from .views import NewsPostCreateAPIView # Corrected import

app_name = 'news_api' # Add app_name for namespacing if needed

urlpatterns = [
    path('posts/', NewsPostCreateAPIView.as_view(), name='create_post'),
] 