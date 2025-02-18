from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    ROLES = (
        ('admin', 'Admin'),
        ('client', 'Client'),
    )
    
    is_premium = models.BooleanField(default=False)
    career = models.CharField(max_length=100, blank=True)
    google_id = models.CharField(max_length=100, blank=True)
    email_verified = models.BooleanField(default=False)
    role = models.CharField(max_length=10, choices=ROLES, default='client')
    
    # Fix the related_name clash
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=_('groups'),
        blank=True,
        help_text=_(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name='custom_user_set',
        related_query_name='custom_user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name='custom_user_set',
        related_query_name='custom_user',
    )
    
    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.email or self.username

    def is_admin(self):
        return self.role == 'admin'

    def is_client(self):
        return self.role == 'client'

class Career(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Tool(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    career = models.ForeignKey(Career, on_delete=models.CASCADE, related_name='tools')
    file = models.FileField(upload_to='tools/')
    is_premium = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Tutorial(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    career = models.ForeignKey(Career, on_delete=models.CASCADE, related_name='tutorials')
    tool = models.ForeignKey(Tool, on_delete=models.SET_NULL, null=True, blank=True, related_name='tutorials')
    video_url = models.URLField(blank=True)
    is_premium = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subscriptions')
    stripe_customer_id = models.CharField(max_length=100)
    stripe_subscription_id = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.is_active}"
