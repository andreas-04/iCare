from django.contrib.auth.models import User
from django.db import models
from django.core.validators import MinValueValidator

class Property(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

 
class MortgageInsurance(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True)
    mortgage_details = models.TextField()
    insurance_details = models.TextField()

class Lawn(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True)
    lawn_size = models.FloatField(null=True, blank=True)
    budget = models.FloatField(null=True, blank=True)
    budget_tolerance = models.FloatField(null=True, blank=True) 
    budget_weight = models.FloatField(null=True, blank=True)
    frequency = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    frequency_weight = models.FloatField(null=True, blank=True)

class Interior(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True)
    number_of_rooms = models.IntegerField(null=True, blank=True)
    floor_space = models.FloatField(null=True, blank=True)
    budget = models.FloatField(null=True, blank=True)
    budget_tolerance = models.FloatField(null=True, blank=True) 
    budget_weight = models.FloatField(null=True, blank=True)
    frequency = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    frequency_weight = models.FloatField(null=True, blank=True)


class Internet(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True)
    users = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    users_weight = models.FloatField(null=True, blank=True)
    speed_requirements = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    speed_weight = models.FloatField(null=True, blank=True)
    speed_tolerance = models.FloatField(null=True, blank=True)
    budget = models.FloatField(null=True, blank=True)
    budget_tolerance = models.FloatField(null=True, blank=True)
    budget_weight = models.FloatField(null=True, blank=True)



class Phone(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True)
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
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True)
    business = models.ForeignKey(User, on_delete=models.CASCADE, related_name='interior_service_plans')
    service_name = models.CharField(max_length=64)
    service_description = models.CharField(max_length=524)
    cost = models.FloatField()
    frequency = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    notification_sent = models.BooleanField(default=False)
    notification_date = models.DateTimeField(null=True, blank=True)

class InternetServicePlan(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True)
    business = models.ForeignKey(User, on_delete=models.CASCADE, related_name='internet_service_plans')
    service_name = models.CharField(max_length=64)
    service_description = models.CharField(max_length=524)
    cost = models.FloatField()
    users = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    speed = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    notification_sent = models.BooleanField(default=False)
    notification_date = models.DateTimeField(null=True, blank=True)

class PhoneServicePlan(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True)
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