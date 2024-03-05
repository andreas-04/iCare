from django.contrib import admin

# Register your models here.

from .models import MortgageInsurance, Lawn, Interior, Internet, Phone, ServicePlan

admin.site.register(MortgageInsurance)
admin.site.register(Lawn)
admin.site.register(Interior)
admin.site.register(Internet)
admin.site.register(Phone)
admin.site.register(ServicePlan)
