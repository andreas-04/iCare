# Generated by Django 5.0.1 on 2024-04-30 01:18

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homeowners', '0016_interiorserviceplan_handshake_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='interiorserviceplan',
            name='notification_date',
        ),
        migrations.RemoveField(
            model_name='interiorserviceplan',
            name='notification_sent',
        ),
        migrations.RemoveField(
            model_name='internetserviceplan',
            name='notification_date',
        ),
        migrations.RemoveField(
            model_name='internetserviceplan',
            name='notification_sent',
        ),
        migrations.RemoveField(
            model_name='lawnserviceplan',
            name='notification_date',
        ),
        migrations.RemoveField(
            model_name='lawnserviceplan',
            name='notification_sent',
        ),
        migrations.RemoveField(
            model_name='phoneserviceplan',
            name='notification_date',
        ),
        migrations.RemoveField(
            model_name='phoneserviceplan',
            name='notification_sent',
        ),
        migrations.CreateModel(
            name='InteriorMatchNotification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('match', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='homeowners.interiorserviceplan')),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_interior_match_notifications', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_interior_match_notifications', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='InternetMatchNotification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('match', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='homeowners.internetserviceplan')),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_internet_match_notifications', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_internet_match_notifications', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='LawnMatchNotification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('match', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='homeowners.phoneserviceplan')),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_lawn_match_notifications', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_lawn_match_notifications', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(blank=True, max_length=255, null=True)),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_notifications', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_notifications', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PhoneMatchNotification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('match', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='homeowners.phoneserviceplan')),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_phone_match_notifications', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_phone_match_notifications', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
