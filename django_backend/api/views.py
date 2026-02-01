"""
Views for the portfolio API
"""
import uuid
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from .models import Project, PortfolioUser
from .serializers import (
    ProjectSerializer,
    UserSerializer,
    SignUpSerializer,
    SignInSerializer,
)


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    """Sign up a new user"""
    serializer = SignUpSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Create user
    user = User.objects.create_user(
        username=serializer.validated_data['email'],
        email=serializer.validated_data['email'],
        first_name=serializer.validated_data['name'],
        password=serializer.validated_data['password'],
    )
    
    # Create token
    token = str(uuid.uuid4())
    portfolio_user = PortfolioUser.objects.create(user=user, token=token)
    
    user_data = UserSerializer(user).data
    
    return Response({
        'user': {
            'id': user.id,
            'email': user.email,
            'name': user.first_name,
        },
        'token': token,
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def signin(request):
    """Sign in a user"""
    serializer = SignInSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=serializer.validated_data['email'])
    except User.DoesNotExist:
        return Response(
            {'error': 'Invalid email or password'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    # Check password
    if not user.check_password(serializer.validated_data['password']):
        return Response(
            {'error': 'Invalid email or password'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    # Get or create token
    portfolio_user, _ = PortfolioUser.objects.get_or_create(user=user)
    if not portfolio_user.token:
        portfolio_user.token = str(uuid.uuid4())
        portfolio_user.save()
    
    return Response({
        'user': {
            'id': user.id,
            'email': user.email,
            'name': user.first_name,
        },
        'token': portfolio_user.token,
    })


class ProjectViewSet(viewsets.ModelViewSet):
    """ViewSet for Project model"""
    serializer_class = ProjectSerializer
    
    def get_permissions(self):
        # Allow all GET requests (public), but require auth for other methods
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def get_queryset(self):
        # Return all projects for GET requests (public), only own for others
        if self.request.method == 'GET':
            return Project.objects.all()
        return Project.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        # Auto-assign project ID and user
        project_id = str(uuid.uuid4())
        serializer.save(id=project_id, user=self.request.user)
    
    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def public(self, request):
        """Get all projects (public endpoint)"""
        projects = Project.objects.all()
        serializer = self.get_serializer(projects, many=True)
        return Response({'projects': serializer.data})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_image(request):
    """Upload an image and return a data URL"""
    # Check if file is in request
    if 'file' not in request.FILES:
        return Response(
            {'error': 'No file provided'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    file = request.FILES['file']
    
    # Validate file is an image
    if not file.content_type.startswith('image/'):
        return Response(
            {'error': 'Uploaded file must be an image'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Read file and convert to base64
    import base64
    file_content = file.read()
    base64_content = base64.b64encode(file_content).decode('utf-8')
    
    # Create data URL
    url = f"data:{file.content_type};base64,{base64_content}"
    
    return Response({'url': url})
