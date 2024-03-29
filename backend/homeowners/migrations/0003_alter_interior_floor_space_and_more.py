# Generated by Django 5.0.1 on 2024-03-21 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homeowners', '0002_alter_lawn_lawn_size'),
    ]

    operations = [
        migrations.AlterField(
            model_name='interior',
            name='floor_space',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='interior',
            name='number_of_rooms',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='phone',
            name='preferred_plan_type',
            field=models.CharField(blank=True, choices=[('prepaid', 'Prepaid Plan'), ('postpaid', 'Postpaid Plan'), ('unlimited', 'Unlimited Plan')], max_length=255, null=True),
        ),
    ]
