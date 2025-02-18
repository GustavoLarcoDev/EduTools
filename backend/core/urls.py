from django.urls import path
from . import views

urlpatterns = [
    # Auth URLs
    path('auth/register/', views.register, name='register'),
    path('auth/login/', views.login, name='login'),
    path('auth/google/', views.google_auth, name='google_auth'),
    path('auth/verify-token/', views.verify_token, name='verify_token'),
    
    # Tutorial URLs
    path('tutorials/', views.tutorial_list, name='tutorial_list'),
    path('tutorials/create/', views.tutorial_create, name='tutorial_create'),
    path('tutorials/<int:pk>/update/', views.tutorial_update, name='tutorial_update'),
    path('tutorials/<int:pk>/delete/', views.tutorial_delete, name='tutorial_delete'),
    
    # Tool URLs
    path('tools/', views.ToolViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='tool-list'),
    path('tools/<int:pk>/', views.ToolViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='tool-detail'),
    
    # Career URLs
    path('careers/', views.CareerViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='career-list'),
    path('careers/<int:pk>/', views.CareerViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='career-detail'),
]
