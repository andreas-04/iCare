# Generated by Django 5.0.1 on 2024-04-07 22:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homeowners', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='interior',
            name='property',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='interiors', to='homeowners.property'),
        ),
        migrations.AddField(
            model_name='internet',
            name='property',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='internets', to='homeowners.property'),
        ),
        migrations.AddField(
            model_name='lawn',
            name='property',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='lawns', to='homeowners.property'),
        ),
        migrations.AddField(
            model_name='phone',
            name='property',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='phones', to='homeowners.property'),
        ),
        migrations.AlterField(
            model_name='property',
            name='interior',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='property_interior', to='homeowners.interior'),
        ),
        migrations.AlterField(
            model_name='property',
            name='internet',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='property_internet', to='homeowners.internet'),
        ),
        migrations.AlterField(
            model_name='property',
            name='lawn',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='property_lawn', to='homeowners.lawn'),
        ),
        migrations.AlterField(
            model_name='property',
            name='phone',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='property_phone', to='homeowners.phone'),
        ),
    ]