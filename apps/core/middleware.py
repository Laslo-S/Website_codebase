from django.contrib.auth import get_user_model

User = get_user_model()

class PreviewModeMiddleware:
    """
    Middleware to check session variables and add preview context to the request.

    Sets `request.is_preview = True` if preview mode is active for a staff user.
    Sets `request.preview_user` to the target User object if previewing a specific client.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        is_preview = False

        if hasattr(request, 'user') and request.user.is_authenticated and request.user.is_staff:
            is_preview = request.session.get('preview_mode_active', False)

        request.is_preview = is_preview

        response = self.get_response(request)
        return response 