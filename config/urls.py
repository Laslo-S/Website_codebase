"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings # Import settings
from django.conf.urls.static import static # Import static

# Import preview control views
from apps.core import views as core_views

urlpatterns = [
    # --- Custom Admin Preview URLs FIRST ---
    path('admin/preview/toggle/', core_views.toggle_preview_mode, name='core_preview_toggle'),
    # --- Standard Admin URLs ---
    path("admin/", admin.site.urls),
    # path("ckeditor/", include('ckeditor_uploader.urls')), # No longer needed for CKEditor 5
    path("", include(("apps.core.urls", "core"), namespace="core")),
    path("accounts/", include(("apps.accounts.urls", "accounts"), namespace="accounts")),
    path("news/", include(("apps.news.urls", "news"), namespace="news")),
    path("ckeditor5/", include('django_ckeditor_5.urls'), name="ck_editor_5_upload_file"), # Add CKEditor 5 URLs
    path('api/v1/accounts/', include('apps.accounts.api_urls')), # JWT Auth
    path('api/v1/news/', include('apps.news.api_urls')),
]

# Add static file serving helper for development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT if hasattr(settings, 'STATIC_ROOT') else settings.STATICFILES_DIRS[0])
    # Add media file serving helper for development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    # Note: Using STATICFILES_DIRS[0] assumes the first entry is the main static dir.
    # If you add media files later, you might add another similar line for MEDIA_URL/MEDIA_ROOT.
