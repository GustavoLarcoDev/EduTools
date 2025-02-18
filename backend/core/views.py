from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Career, Tool, Tutorial, Subscription, User
from .serializers import (
    CareerSerializer, ToolSerializer, TutorialSerializer,
    SubscriptionSerializer, UserSerializer
)
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

class CareerViewSet(viewsets.ModelViewSet):
    queryset = Career.objects.all()
    serializer_class = CareerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

class ToolViewSet(viewsets.ModelViewSet):
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer
    permission_classes = [permissions.AllowAny]  # Permitir acceso sin autenticación durante desarrollo
    filterset_fields = ['career', 'is_premium']

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.is_authenticated and self.request.user.is_premium:
            pass  # Mostrar todas las herramientas si el usuario es premium
        else:
            queryset = queryset.filter(is_premium=False)  # Solo mostrar herramientas no premium para usuarios anónimos o no premium
        career = self.request.query_params.get('career', None)
        if career is not None:
            queryset = queryset.filter(career=career)
        return queryset

class TutorialViewSet(viewsets.ModelViewSet):
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer
    permission_classes = [permissions.AllowAny]  # Permitir acceso sin autenticación durante desarrollo
    filterset_fields = ['career', 'tool', 'is_premium']

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.is_authenticated and self.request.user.is_premium:
            pass  # Mostrar todos los tutoriales si el usuario es premium
        else:
            queryset = queryset.filter(is_premium=False)  # Solo mostrar tutoriales no premium para usuarios anónimos o no premium
        career = self.request.query_params.get('career', None)
        tool = self.request.query_params.get('tool', None)
        if career is not None:
            queryset = queryset.filter(career=career)
        if tool is not None:
            queryset = queryset.filter(tool=tool)
        return queryset

class SubscriptionViewSet(viewsets.ModelViewSet):
    serializer_class = SubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Subscription.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def create_checkout_session(self, request):
        # This will be implemented with Stripe integration
        pass

    @action(detail=False, methods=['post'])
    def webhook(self, request):
        # This will handle Stripe webhooks
        pass

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Tutorial, Tool, User
from .serializers import TutorialSerializer, ToolSerializer, UserSerializer
from .decorators import role_required

# Tutorial views
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tutorial_list(request):
    tutorials = Tutorial.objects.all()
    serializer = TutorialSerializer(tutorials, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@role_required(['admin'])
def tutorial_create(request):
    serializer = TutorialSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@role_required(['admin'])
def tutorial_update(request, pk):
    try:
        tutorial = Tutorial.objects.get(pk=pk)
    except Tutorial.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TutorialSerializer(tutorial, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@role_required(['admin'])
def tutorial_delete(request, pk):
    try:
        tutorial = Tutorial.objects.get(pk=pk)
    except Tutorial.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    tutorial.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# Tool views
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tool_list(request):
    tools = Tool.objects.all()
    serializer = ToolSerializer(tools, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@role_required(['admin'])
def tool_create(request):
    serializer = ToolSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@role_required(['admin'])
def tool_update(request, pk):
    try:
        tool = Tool.objects.get(pk=pk)
    except Tool.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ToolSerializer(tool, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@role_required(['admin'])
def tool_delete(request, pk):
    try:
        tool = Tool.objects.get(pk=pk)
    except Tool.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    tool.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# Register view
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    email = request.data.get('email')
    password = request.data.get('password')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    role = request.data.get('role', 'client')  # Por defecto, los usuarios son clientes
    
    if not email or not password:
        return Response(
            {'error': 'Email and password are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
        
    if User.objects.filter(email=email).exists():
        return Response(
            {'error': 'Email already registered'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
        
    try:
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            role=role
        )
        
        # Generar tokens
        refresh = RefreshToken.for_user(user)
        tokens = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        
        return Response({
            'tokens': tokens,
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': user.role
            }
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_400_BAD_REQUEST
        )

# Login view
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response(
            {'error': 'Email and password are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        user = User.objects.get(email=email)
        if not user.check_password(password):
            raise User.DoesNotExist
            
        refresh = RefreshToken.for_user(user)
        tokens = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        
        return Response({
            'tokens': tokens,
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': user.role
            }
        })
        
    except User.DoesNotExist:
        return Response(
            {'error': 'Invalid credentials'}, 
            status=status.HTTP_401_UNAUTHORIZED
        )

# Verify token view
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verify_token(request):
    user = request.user
    return Response({
        'id': user.id,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'role': user.role
    })

# Google authentication view
@api_view(['POST'])
@permission_classes([AllowAny])
def google_auth(request):
    google_token = request.data.get('token')
    if not google_token:
        return Response(
            {'error': 'Google token is required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        # Aquí iría la validación del token de Google
        # Por ahora, solo retornamos un error
        return Response(
            {'error': 'Google authentication not implemented yet'}, 
            status=status.HTTP_501_NOT_IMPLEMENTED
        )
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_400_BAD_REQUEST
        )
