# Generated by Django 5.0.1 on 2024-05-03 05:44

import django.contrib.auth.models
import django.contrib.auth.validators
import django.core.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Interior',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('floor_space', models.FloatField(blank=True, null=True)),
                ('budget', models.FloatField(blank=True, null=True)),
                ('budget_tolerance', models.FloatField(blank=True, null=True)),
                ('budget_weight', models.FloatField(blank=True, null=True)),
                ('frequency', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('frequency_weight', models.FloatField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Internet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('users', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('users_weight', models.FloatField(blank=True, null=True)),
                ('speed_requirements', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('speed_weight', models.FloatField(blank=True, null=True)),
                ('speed_tolerance', models.FloatField(blank=True, null=True)),
                ('budget', models.FloatField(blank=True, null=True)),
                ('budget_tolerance', models.FloatField(blank=True, null=True)),
                ('budget_weight', models.FloatField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Lawn',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lawn_size', models.FloatField(blank=True, null=True)),
                ('budget', models.FloatField(blank=True, null=True)),
                ('budget_tolerance', models.FloatField(blank=True, null=True)),
                ('budget_weight', models.FloatField(blank=True, null=True)),
                ('frequency', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('frequency_weight', models.FloatField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Phone',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('budget', models.FloatField(blank=True, null=True)),
                ('budget_tolerance', models.FloatField(blank=True, null=True)),
                ('budget_weight', models.FloatField(blank=True, null=True)),
                ('users', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('users_weight', models.FloatField(blank=True, null=True)),
                ('preferred_plan_type', models.CharField(blank=True, choices=[('prepaid', 'Prepaid Plan'), ('postpaid', 'Postpaid Plan'), ('unlimited', 'Unlimited Plan')], max_length=255, null=True)),
                ('plan_weight', models.FloatField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('phone_number', models.CharField(blank=True, max_length=15, null=True)),
                ('user_t', models.CharField(choices=[('homeowner', 'Homeowner'), ('business', 'Business')], max_length=255)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
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
            name='Property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(blank=True, max_length=32, null=True)),
                ('interior', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='property_interior', to='homeowners.interior')),
                ('internet', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='property_internet', to='homeowners.internet')),
                ('lawn', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='property_lawn', to='homeowners.lawn')),
                ('phone', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='property_phone', to='homeowners.phone')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PhoneServicePlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('handshake', models.BooleanField(default=False)),
                ('service_name', models.CharField(blank=True, max_length=64)),
                ('service_description', models.CharField(blank=True, max_length=524)),
                ('cost', models.FloatField(blank=True)),
                ('users', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('plan_type', models.CharField(blank=True, choices=[('prepaid', 'Prepaid Plan'), ('postpaid', 'Postpaid Plan'), ('unlimited', 'Unlimited Plan')], max_length=255, null=True)),
                ('business', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='phone_service_plans', to=settings.AUTH_USER_MODEL)),
                ('property', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='homeowners.property')),
            ],
        ),
        migrations.CreateModel(
            name='PhoneMatchNotification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_phone_match_notifications', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_phone_match_notifications', to=settings.AUTH_USER_MODEL)),
                ('match', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='homeowners.phoneserviceplan')),
                ('property', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='phone_property', to='homeowners.property')),
            ],
        ),
        migrations.AddField(
            model_name='phone',
            name='property',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='phones', to='homeowners.property'),
        ),
        migrations.CreateModel(
            name='MortgageInsurance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mortgage_details', models.TextField()),
                ('insurance_details', models.TextField()),
                ('property', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='homeowners.property')),
            ],
        ),
        migrations.CreateModel(
            name='LawnServicePlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('handshake', models.BooleanField(default=False)),
                ('service_name', models.CharField(blank=True, max_length=64)),
                ('service_description', models.CharField(blank=True, max_length=524)),
                ('cost', models.FloatField(blank=True)),
                ('frequency', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('business', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='lawn_service_plans', to=settings.AUTH_USER_MODEL)),
                ('property', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='homeowners.property')),
            ],
        ),
        migrations.CreateModel(
            name='LawnMatchNotification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_lawn_match_notifications', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_lawn_match_notifications', to=settings.AUTH_USER_MODEL)),
                ('match', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='homeowners.lawnserviceplan')),
                ('property', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='lawn_property', to='homeowners.property')),
            ],
        ),
        migrations.AddField(
            model_name='lawn',
            name='property',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='lawns', to='homeowners.property'),
        ),
        migrations.CreateModel(
            name='InternetServicePlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('handshake', models.BooleanField(default=False)),
                ('service_name', models.CharField(blank=True, max_length=64)),
                ('service_description', models.CharField(blank=True, max_length=524)),
                ('cost', models.FloatField(blank=True)),
                ('users', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('speed', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('business', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='internet_service_plans', to=settings.AUTH_USER_MODEL)),
                ('property', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='homeowners.property')),
            ],
        ),
        migrations.CreateModel(
            name='InternetMatchNotification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_internet_match_notifications', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_internet_match_notifications', to=settings.AUTH_USER_MODEL)),
                ('match', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='homeowners.internetserviceplan')),
                ('property', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='internet_property', to='homeowners.property')),
            ],
        ),
        migrations.AddField(
            model_name='internet',
            name='property',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='internets', to='homeowners.property'),
        ),
        migrations.CreateModel(
            name='InteriorServicePlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('handshake', models.BooleanField(default=False)),
                ('service_name', models.CharField(blank=True, max_length=64)),
                ('service_description', models.CharField(blank=True, max_length=524)),
                ('cost', models.FloatField(blank=True)),
                ('frequency', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('business', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='interior_service_plans', to=settings.AUTH_USER_MODEL)),
                ('property', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='homeowners.property')),
            ],
        ),
        migrations.CreateModel(
            name='InteriorMatchNotification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_interior_match_notifications', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_interior_match_notifications', to=settings.AUTH_USER_MODEL)),
                ('match', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='homeowners.interiorserviceplan')),
                ('property', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='interior_property', to='homeowners.property')),
            ],
        ),
        migrations.AddField(
            model_name='interior',
            name='property',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='interiors', to='homeowners.property'),
        ),
    ]
