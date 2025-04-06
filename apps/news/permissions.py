from rest_framework import permissions

class IsNewsAgent(permissions.BasePermission):
    """
    Custom permission to only allow users in the 'AI-Agents' group.
    """

    def has_permission(self, request, view):
        # Check if the user is authenticated first (IsAuthenticated should also be in view)
        if not request.user or not request.user.is_authenticated:
            return False
        # Check if the authenticated user is in the correct group
        return request.user.groups.filter(name='AI-Agents').exists() 