from django.shortcuts import render

from django.contrib.auth.models import User
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from homeowners.serializers import UserSerializer
from .models import MortgageInsurance, Lawn, Interior, Internet, Phone, ServicePlan
from .serializers import MortgageInsuranceSerializer, LawnSerializer, InteriorSerializer, InternetSerializer, PhoneSerializer, ServicePlanSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class MortgageInsuranceViewSet(viewsets.ModelViewSet):
    queryset = MortgageInsurance.objects.all()
    serializer_class = MortgageInsuranceSerializer

class LawnViewSet(viewsets.ModelViewSet):
    queryset = Lawn.objects.all()
    serializer_class = LawnSerializer

class InteriorViewSet(viewsets.ModelViewSet):
    queryset = Interior.objects.all()
    serializer_class = InteriorSerializer

class InternetViewSet(viewsets.ModelViewSet):
    queryset = Internet.objects.all()
    serializer_class = InternetSerializer

class PhoneViewSet(viewsets.ModelViewSet):
    queryset = Phone.objects.all()
    serializer_class = PhoneSerializer

class ServicePlanViewSet(viewsets.ModelViewSet):
    queryset = ServicePlan.objects.all()
    serializer_class = ServicePlanSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django.utils import timezone
from .models import ServicePlan, Lawn, Phone, Internet

class MatchServicePlansView(APIView):
    def get(self, request):
        service_plans = ServicePlan.objects.filter(notification_sent=False)
        
        for plan in service_plans:
            if plan.service_type == 'lawnCare':
                service_model = Lawn
            elif plan.service_type == 'phone':
                service_model = Phone
            elif plan.service_type == 'internet':
                service_model = Internet
            else:
                continue
            
            service_instance = service_model.objects.filter(user=plan.homeowner).first()
            
            if service_instance and plan.cost <= service_instance.budget:
                # send_mail(
                #     'Service Plan Match Found',
                #     'Your budget matches a service plan.',
                #     'from@example.com',
                #     [plan.homeowner.email],
                #     fail_silently=False,
                # )
                plan.notification_sent = True
                plan.notification_date = timezone.now()
                plan.save()
        
        return Response({"message": "Service plan matching completed."})