# Generated by Django 5.0.1 on 2024-04-30 22:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homeowners', '0017_remove_interiorserviceplan_notification_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lawnmatchnotification',
            name='match',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='homeowners.lawnserviceplan'),
        ),
    ]