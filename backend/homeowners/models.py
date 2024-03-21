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
    tolerance = models.FloatField(null=True, blank=True)

class Interior(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True)
    number_of_rooms = models.IntegerField(null=True, blank=True)
    floor_space = models.FloatField(null=True, blank=True)
    budget = models.FloatField(null=True, blank=True)
    tolerance = models.FloatField(null=True, blank=True) 


class Internet(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True)
    internet_speed_needs = models.IntegerField(validators=[MinValueValidator(0)], null=True, blank=True)
    budget = models.FloatField(null=True, blank=True)
    tolerance = models.FloatField(null=True, blank=True)



class Phone(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True)
    number_of_cell_phones = models.IntegerField(null=True, blank=True)
    budget = models.FloatField(null=True, blank=True)
    tolerance = models.FloatField(null=True, blank=True)
    preferred_plan_type = models.CharField(
        max_length=255,
        choices=[
            ('prepaid','Prepaid Plan'),
            ('postpaid','Postpaid Plan'),
            ('unlimited','Unlimited Plan'),
        ], null=True, blank=True
    )



class ServicePlan(models.Model):
    homeowner = models.ForeignKey(User, on_delete=models.CASCADE,  related_name='homeowner_service_plans',  null=True)
    business = models.ForeignKey(User, on_delete=models.CASCADE, related_name='business_service_plans')
    service_name = models.CharField(max_length=64)
    service_description = models.CharField(max_length=524)
    service_type = models.CharField(
        max_length=255,
        choices=[
            ('lawnCare', 'Lawn Care Service Plan'),
            ('internet', 'Internet Service Plan'),
            ('phone', 'Phone Service Plan'),
            ('interior', 'Interior Service Plan')
        ]
    )
    cost = models.FloatField()
    notification_sent = models.BooleanField(default=False)
    notification_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.name} - {self.service_type} Plan"
    

