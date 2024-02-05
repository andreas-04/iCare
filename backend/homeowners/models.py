from django.db import models

class Homeowner(models.Model):
    name = models.CharField(max_length=255)
    contact_information = models.CharField(max_length=255)
    address = models.TextField()

    def __str__(self):
        return self.name

class MortgageInsurance(models.Model):
    homeowner = models.OneToOneField(Homeowner, on_delete=models.CASCADE)
    mortgage_details = models.TextField()
    insurance_details = models.TextField()

class Lawn(models.Model):
    homeowner = models.OneToOneField(Homeowner, on_delete=models.CASCADE)
    lawn_size = models.FloatField()
    flower_bed_sizes = models.TextField()
    number_of_trees = models.IntegerField()
    #satellite_picture = models.ImageField(upload_to='lawn_pictures/')

class Interior(models.Model):
    homeowner = models.OneToOneField(Homeowner, on_delete=models.CASCADE)
    #floor_plan = models.FileField(upload_to='floor_plans/')
    number_of_rooms = models.IntegerField()
    floor_space = models.FloatField()

class Internet(models.Model):
    homeowner = models.OneToOneField(Homeowner, on_delete=models.CASCADE)
    internet_speed_needs = models.CharField(max_length=255)
    source_link = models.URLField()

class Phones(models.Model):
    homeowner = models.OneToOneField(Homeowner, on_delete=models.CASCADE)
    number_of_cell_phones = models.IntegerField()

class ServicePlan(models.Model):
    homeowner = models.ForeignKey(Homeowner, on_delete=models.CASCADE)
    service_type = models.CharField(max_length=255)
    current_plans = models.TextField()
    costs = models.FloatField()
    contract_expiry_date = models.DateField()

    def __str__(self):
        return f"{self.homeowner.name} - {self.service_type} Plan"
