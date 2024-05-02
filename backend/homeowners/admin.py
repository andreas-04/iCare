from django.contrib import admin

# Register your models here.

from .models import MortgageInsurance, Lawn, Interior, Internet, Phone, Property, LawnServicePlan, InteriorServicePlan, InternetServicePlan, PhoneServicePlan, UserProfile

admin.site.register(UserProfile)
admin.site.register(MortgageInsurance)
admin.site.register(Lawn)
admin.site.register(Interior)
admin.site.register(Internet)
admin.site.register(Phone)
admin.site.register(LawnServicePlan)
admin.site.register(InteriorServicePlan)
admin.site.register(InternetServicePlan)
admin.site.register(PhoneServicePlan)
admin.site.register(Property)

