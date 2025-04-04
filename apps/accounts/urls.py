from django.urls import path
from .views import UserProfileView, UserPageView, CustomLoginView
from django.contrib.auth import views as auth_views

app_name = 'accounts'

urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('user/<str:username>/', UserPageView.as_view(), name='user_page'),
    path('logout/', auth_views.LogoutView.as_view(next_page='core:home'), name='logout'),
] 