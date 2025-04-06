from django.urls import path
from .views import NewsListView, NewsDetailView, NewsPostCreateAPIView

app_name = 'news'

urlpatterns = [
    path('', NewsListView.as_view(), name='news_list'),
    path('<slug:slug>/', NewsDetailView.as_view(), name='news_detail'),
    # API URLs
    path('api/news-posts/create/', NewsPostCreateAPIView.as_view(), name='api_newspost_create'),
] 