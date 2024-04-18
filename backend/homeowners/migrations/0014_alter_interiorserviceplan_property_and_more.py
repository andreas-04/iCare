# Generated by Django 5.0.1 on 2024-04-17 18:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homeowners', '0013_remove_property_interestedininterior_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='interiorserviceplan',
            name='property',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='homeowners.property'),
        ),
        migrations.AlterField(
            model_name='internetserviceplan',
            name='property',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='homeowners.property'),
        ),
        migrations.AlterField(
            model_name='lawnserviceplan',
            name='property',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='homeowners.property'),
        ),
        migrations.AlterField(
            model_name='phoneserviceplan',
            name='property',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='homeowners.property'),
        ),
    ]
