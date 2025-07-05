from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class IsAuthenticatedOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow read permission for all users
        if request.method in permissions.SAFE_METHODS:
            return True

        # Allow update (POST, PUT, PATCH) only for authenticated users
        return request.user and request.user.is_authenticated
