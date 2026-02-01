"""
Serializers for the portfolio API
"""
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Project, PortfolioUser


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name']


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for Project model"""
    class Meta:
        model = Project
        fields = [
            'id',
            'name',
            'description',
            'images',
            'github_url',
            'linkedin_url',
            'demo_url',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']


class SignUpSerializer(serializers.Serializer):
    """Serializer for signup"""
    email = serializers.EmailField()
    password = serializers.CharField(min_length=6, write_only=True)
    name = serializers.CharField(max_length=255)
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already in use")
        return value


class SignInSerializer(serializers.Serializer):
    """Serializer for signin"""
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
