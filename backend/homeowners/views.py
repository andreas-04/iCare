from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from rest_framework import viewsets, status
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from homeowners.serializers import UserSerializer
from .models import MortgageInsurance, Lawn, Interior, Internet, Phone, Property, LawnServicePlan, InternetServicePlan, InteriorServicePlan, PhoneServicePlan
from .serializers import UserSerializer, MortgageInsuranceSerializer, LawnSerializer, InteriorSerializer, InternetSerializer, PhoneSerializer, LawnServicePlanSerializer, InteriorServicePlanSerializer, InternetServicePlanSerializer, PhoneServicePlanSerializer, PropertySerializer
from django.http import JsonResponse
from django.contrib.auth import logout

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            response = JsonResponse({"detail": "Login successful"}, status=status.HTTP_200_OK)
            response.set_cookie('user_id', user.id, httponly=True, secure=True, samesite='Strict')
            return response
        
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Successfully logged out.'})

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['get'])
    def properties(self, request, pk=None):
        user = self.get_object()
        properties = Property.objects.filter(user=user)
        serializer = PropertySerializer(properties, many=True)
        return Response(serializer.data)
    


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

class LawnServicePlanViewSet(viewsets.ModelViewSet):
    queryset = LawnServicePlan.objects.all()
    serializer_class = LawnServicePlanSerializer
class InteriorServicePlanViewSet(viewsets.ModelViewSet):
    queryset = InteriorServicePlan.objects.all()
    serializer_class = InteriorServicePlanSerializer
class InternetServicePlanViewSet(viewsets.ModelViewSet):
    queryset = InternetServicePlan.objects.all()
    serializer_class = InternetServicePlanSerializer
class PhoneServicePlanViewSet(viewsets.ModelViewSet):
    queryset = PhoneServicePlan.objects.all()
    serializer_class = PhoneServicePlanSerializer


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer



def calculate_lawn_score(self, service_plan, lawn):
    score = 