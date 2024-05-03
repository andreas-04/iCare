from django.contrib.auth.models import User, AbstractUser, Group, Permission
from django.db import models
from django.core.validators import MinValueValidator
from django.conf import settings


class UserProfile(AbstractUser):
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    user_t = models.CharField(max_length=255, choices=[("homeowner", "Homeowner"),("business","Business")], blank=False)
    # Specify a unique related_name for groups and user_permissions
    # groups = models.ManyToManyField(Group, related_name='userprofile_groups')
    # user_permissions = models.ManyToManyField(Permission, related_name='userprofile_permissions')
class Property(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    address = models.CharField(max_length=32, null=True, blank=True)
    lawn = models.OneToOneField('Lawn', on_delete=models.CASCADE, null=True, blank=True, related_name='property_lawn')
    phone = models.OneToOneField('Phone', on_delete=models.CASCADE, null=True, blank=True, related_name='property_phone')
    internet = models.OneToOneField('Internet', on_delete=models.CASCADE, null=True, blank=True, related_name='property_internet')
    interior = models.OneToOneField('Interior', on_delete=models.CASCADE, null=True, blank=True, related_name='property_interior')

class MortgageInsurance(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True)
    mortgage_details = models.TextField()
    insurance_details = models.TextField()

class Lawn(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True, related_name='lawns')
    lawn_size = models.FloatField(null=True, blank=True)
    budget = models.FloatField(null=True, blank=True)
    budget_tolerance = models.FloatField(null=True, blank=True) 
    budget_weight = models.FloatField(null=True, blank=True)
    frequency = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    frequency_weight = models.FloatField(null=True, blank=True)

class Interior(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True, related_name='interiors')
    floor_space = models.FloatField(null=True, blank=True)
    budget = models.FloatField(null=True, blank=True)
    budget_tolerance = models.FloatField(null=True, blank=True) 
    budget_weight = models.FloatField(null=True, blank=True)
    frequency = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    frequency_weight = models.FloatField(null=True, blank=True)


class Internet(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True, related_name='internets')
    users = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    users_weight = models.FloatField(null=True, blank=True)
    speed_requirements = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    speed_weight = models.FloatField(null=True, blank=True)
    speed_tolerance = models.FloatField(null=True, blank=True)
    budget = models.FloatField(null=True, blank=True)
    budget_tolerance = models.FloatField(null=True, blank=True)
    budget_weight = models.FloatField(null=True, blank=True)



class Phone(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True, related_name='phones')
    budget = models.FloatField(null=True, blank=True)
    budget_tolerance = models.FloatField(null=True, blank=True)
    budget_weight = models.FloatField(null=True, blank=True)
    users = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    users_weight = models.FloatField(null=True, blank=True)
 
    preferred_plan_type = models.CharField(
        max_length=255,
        choices=[
            ('prepaid','Prepaid Plan'),
            ('postpaid','Postpaid Plan'),
            ('unlimited','Unlimited Plan'),
        ], null=True, blank=True
    )
    plan_weight = models.FloatField(null=True, blank=True)




class LawnServicePlan(models.Model):
    property = models.ForeignKey(Property,on_delete=models.SET_NULL, null=True, blank=True)
    business = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='lawn_service_plans', blank=True)
    handshake = models.BooleanField(default=False)
    service_name = models.CharField(max_length=64, blank=True)
    service_description = models.CharField(max_length=524, blank=True)
    cost = models.FloatField( blank=True)
    frequency = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)


class InteriorServicePlan(models.Model):
    property = models.ForeignKey(Property,on_delete=models.SET_NULL, null=True, blank=True)
    business = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='interior_service_plans', blank=True)
    handshake = models.BooleanField(default=False)
    service_name = models.CharField(max_length=64, blank=True)
    service_description = models.CharField(max_length=524, blank=True)
    cost = models.FloatField(blank=True)
    frequency = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)


class InternetServicePlan(models.Model):
    property = models.ForeignKey(Property,on_delete=models.SET_NULL, null=True, blank=True)
    business = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='internet_service_plans', blank=True)
    handshake = models.BooleanField(default=False)
    service_name = models.CharField(max_length=64, blank=True)
    service_description = models.CharField(max_length=524, blank=True)
    cost = models.FloatField(blank=True)
    users = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    speed = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)


class PhoneServicePlan(models.Model):
    property = models.ForeignKey(Property, on_delete=models.SET_NULL, null=True, blank=True)
    business = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='phone_service_plans', blank=True)
    handshake = models.BooleanField(default=False)
    service_name = models.CharField(max_length=64, blank=True)
    service_description = models.CharField(max_length=524, blank=True)
    cost = models.FloatField(blank=True)
    users = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    plan_type = models.CharField(
        max_length=255,
        choices=[
            ('prepaid','Prepaid Plan'),
            ('postpaid','Postpaid Plan'),
            ('unlimited','Unlimited Plan'),
        ], null=True, blank=True
    )


class Notification(models.Model):
    message = models.CharField(max_length=255, null=True, blank=True)
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, related_name='sent_notifications')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, related_name='received_notifications')

class LawnMatchNotification(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, related_name='sent_lawn_match_notifications')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, related_name='received_lawn_match_notifications')
    match = models.ForeignKey(LawnServicePlan, on_delete=models.CASCADE, blank=False)

class InteriorMatchNotification(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, related_name='sent_interior_match_notifications')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, related_name='received_interior_match_notifications')
    match = models.ForeignKey(InteriorServicePlan, on_delete=models.CASCADE, blank=False)

class InternetMatchNotification(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, related_name='sent_internet_match_notifications')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, related_name='received_internet_match_notifications')
    match = models.ForeignKey(InternetServicePlan, on_delete=models.CASCADE, blank=False)

class PhoneMatchNotification(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, related_name='sent_phone_match_notifications')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, related_name='received_phone_match_notifications')
    match = models.ForeignKey(PhoneServicePlan, on_delete=models.CASCADE, blank=False)