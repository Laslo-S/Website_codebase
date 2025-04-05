from django.urls import path
from .views import NewsListView, NewsDetailView, ArticleCreateAPIView

app_name = 'news'

urlpatterns = [
    path('', NewsListView.as_view(), name='news_list'),
    path('<slug:slug>/', NewsDetailView.as_view(), name='news_detail'),
    # API URLs
    path('api/articles/create/', ArticleCreateAPIView.as_view(), name='api_article_create'),
] 