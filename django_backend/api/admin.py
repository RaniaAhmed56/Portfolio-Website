"""
Django admin configuration
"""
from django.contrib import admin
from .models import Project, PortfolioUser


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'created_at']
    search_fields = ['name', 'description']
    list_filter = ['created_at']


@admin.register(PortfolioUser)
class PortfolioUserAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at']
    search_fields = ['user__email']
