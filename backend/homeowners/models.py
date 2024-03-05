from django.contrib.auth.models import User
from django.db import models

class MortgageInsurance(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mortgage_details = models.TextField()
    insurance_details = models.TextField()

class Lawn(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    lawn_size = models.FloatField()
    flower_bed_sizes = models.TextField()
    number_of_trees = models.IntegerField()
    budget = models.FloatField(null=True, blank=True)
    #satellite_picture = models.ImageField(upload_to='lawn_pictures/')

class Interior(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    #floor_plan = models.FileField(upload_to='floor_plans/')
    number_of_rooms = models.IntegerField()
    floor_space = models.FloatField()


class Internet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    internet_speed_needs = models.CharField(max_length=255)
    budget = models.FloatField(null=True, blank=True)


class Phone(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    number_of_cell_phones = models.IntegerField()
    budget = models.FloatField(null=True, blank=True)


class ServicePlan(models.Model):
    homeowner = models.ForeignKey(User, on_delete=models.CASCADE,  related_name='homeowner_service_plans',  null=True)
    business = models.ForeignKey(User, on_delete=models.CASCADE, related_name='business_service_plans')
    service_name = models.CharField(max_length=64)
    service_type = models.CharField(
        max_length=255,
        choices=[
            ('lawnCare', 'Lawn Care Service'),
            ('internet', 'Internet Service Plan'),
            ('phone', 'Phone Plan'),
        ]
    )
    cost = models.FloatField()
    notification_sent = models.BooleanField(default=False)
    notification_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.name} - {self.service_type} Plan"
    

