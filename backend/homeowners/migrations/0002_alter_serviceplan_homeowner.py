# Generated by Django 5.0.1 on 2024-02-28 21:53

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homeowners', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='serviceplan',
            name='homeowner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='homeowner_service_plans', to=settings.AUTH_USER_MODEL),
        ),
    ]