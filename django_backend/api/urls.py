"""
URL configuration for the API
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, signup, signin, upload_image

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', signup, name='signup'),
    path('signin/', signin, name='signin'),
    path('upload/', upload_image, name='upload'),
]
