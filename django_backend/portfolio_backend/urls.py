"""
URL configuration for portfolio_backend project.
"""
from django.urls import path, include

urlpatterns = [
    path('api/', include('api.urls')),
]
