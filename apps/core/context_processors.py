from django.contrib.auth import get_user_model

User = get_user_model()

def preview_context(request):
    """Adds preview mode status and target client username to template context."""
    is_preview_mode = False

    if hasattr(request, 'user') and request.user.is_authenticated and request.user.is_staff:
        is_preview_mode = request.session.get('preview_mode_active', False)

    return {
        'is_preview_mode': is_preview_mode,
    } 