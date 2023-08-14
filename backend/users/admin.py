from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from users.models import AppUser

class UserAdmin(DefaultUserAdmin):
    #fields used on the change user page.
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('username',)}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'user_permissions')}),
    )
    #fields used when creating a new user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'username', 'is_staff')
    list_filter = ('is_staff', 'is_superuser')  
    search_fields = ('email', 'username')
    ordering = ('email',)

admin.site.register(AppUser, UserAdmin)

