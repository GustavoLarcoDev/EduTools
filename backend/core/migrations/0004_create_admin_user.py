from django.db import migrations
from django.contrib.auth.hashers import make_password

def create_admin_user(apps, schema_editor):
    User = apps.get_model('core', 'User')
    admin = User.objects.create(
        username='admin@edutools.com',
        email='admin@edutools.com',
        password=make_password('admin123'),  # La contraseña será: admin123
        first_name='Admin',
        last_name='User',
        role='admin',
        is_staff=True,
        is_superuser=True,
        is_active=True
    )

class Migration(migrations.Migration):
    dependencies = [
        ('core', '0003_user_role'),  # Asegúrate de que este sea el nombre de tu última migración
    ]

    operations = [
        migrations.RunPython(create_admin_user),
    ]
