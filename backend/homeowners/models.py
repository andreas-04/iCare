from django.contrib.auth.models import User
from django.db import models
from django.core.validators import MinValueValidator

class Property(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=32, null=True, blank=True)
    lawn = models.OneToOneField('Lawn', on_delete=models.CASCADE, null=True, blank=True, related_name='property_lawn')
    phone = models.OneToOneField('Phone', on_delete=models.CASCADE, null=True, blank=True, related_name='property_phone')
    internet = models.OneToOneField('Internet', on_delete=models.CASCADE, null=True, blank=True, related_name='property_internet')
    interior = models.OneToOneField('Interior', on_delete=models.CASCADE, null=True, blank=True, related_name='property_interior')
    interestedInLawn = models.BooleanField(default=False)
    interestedInInterior = models.BooleanField(default=False)
    interestedInPhone = models.BooleanField(default=False)
    interestedInInternet = models.BooleanField(default=False)
    
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
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True)
    business = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lawn_service_plans')
    service_name = models.CharField(max_length=64)
    service_description = models.CharField(max_length=524)
    cost = models.FloatField()
    frequency = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    notification_sent = models.BooleanField(default=False)
    notification_date = models.DateTimeField(null=True, blank=True)

class InteriorServicePlan(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True)
    business = models.ForeignKey(User, on_delete=models.CASCADE, related_name='interior_service_plans')
    service_name = models.CharField(max_length=64)
    service_description = models.CharField(max_length=524)
    cost = models.FloatField()
    frequency = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    notification_sent = models.BooleanField(default=False)
    notification_date = models.DateTimeField(null=True, blank=True)

class InternetServicePlan(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True)
    business = models.ForeignKey(User, on_delete=models.CASCADE, related_name='internet_service_plans')
    service_name = models.CharField(max_length=64)
    service_description = models.CharField(max_length=524)
    cost = models.FloatField()
    users = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    speed = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    notification_sent = models.BooleanField(default=False)
    notification_date = models.DateTimeField(null=True, blank=True)

class PhoneServicePlan(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True)
    business = models.ForeignKey(User, on_delete=models.CASCADE, related_name='phone_service_plans')
    service_name = models.CharField(max_length=64)
    service_description = models.CharField(max_length=524)
    cost = models.FloatField()
    users = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    plan_type = models.CharField(
        max_length=255,
        choices=[
            ('prepaid','Prepaid Plan'),
            ('postpaid','Postpaid Plan'),
            ('unlimited','Unlimited Plan'),
        ], null=True, blank=True
    )
    notification_sent = models.BooleanField(default=False)
    notification_date = models.DateTimeField(null=True, blank=True)