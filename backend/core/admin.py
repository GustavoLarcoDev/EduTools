from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Career, Tool, Tutorial, Subscription

# Register your models here.

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'is_premium', 'career', 'is_staff')
    list_filter = ('is_premium', 'is_staff', 'is_superuser', 'career')
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('is_premium', 'career')}),
    )

@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name',)

@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):
    list_display = ('title', 'career', 'is_premium', 'created_at')
    list_filter = ('is_premium', 'career')
    search_fields = ('title', 'description')

@admin.register(Tutorial)
class TutorialAdmin(admin.ModelAdmin):
    list_display = ('title', 'career', 'tool', 'is_premium', 'created_at')
    list_filter = ('is_premium', 'career', 'tool')
    search_fields = ('title', 'content')

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_active', 'start_date', 'end_date')
    list_filter = ('is_active',)
    search_fields = ('user__username', 'user__email')
