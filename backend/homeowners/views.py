from django.shortcuts import render, get_object_or_404
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
from .complex_scoring_functions import calculate_internet_score, calculate_lawn_interior_score, calculate_phone_score
from .serializers import ScoredLawnServicePlanSerializer, ScoredInteriorServicePlanSerializer, ScoredInternetServicePlanSerializer, ScoredPhoneServicePlanSerializer

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
            response.set_cookie('user_id', user.id, httponly=False, secure=False, samesite='None')
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




class ScoredLawnPlans(APIView):
    def get(self, request, property_id):
        # Fetch the Lawn instance associated with the property
        lawn = get_object_or_404(Lawn, property_id=property_id)
        
        # Fetch all LawnServicePlans
        service_plans = LawnServicePlan.objects.all()
        
        # Calculate scores for each service plan and store them in a list
        scored_service_plans = []
        for plan in service_plans:
            score = calculate_lawn_interior_score(plan.cost, lawn.budget, lawn.budget_tolerance, lawn.budget_weight, plan.frequency, lawn.frequency, lawn.frequency_weight)
            # Append the plan and its score to the list
            scored_service_plans.append({
                'service_plan': plan,
                'score': score
            })
        
        # Sort the scored service plans by score in descending order
        scored_service_plans.sort(key=lambda x: x['score'], reverse=True)
        
        # Serialize the scored service plans
        serializer = ScoredLawnServicePlanSerializer(scored_service_plans, many=True)
        
        return Response(serializer.data)

class ScoredInteriorPlans(APIView):
    def get(self, request, property_id):
        # Fetch the Interior instance associated with the property
        interior = get_object_or_404(Interior, property_id=property_id)
        
        # Fetch all InteriorServicePlans
        service_plans = InteriorServicePlan.objects.all()
        
        # Calculate scores for each service plan and store them in a list
        scored_service_plans = []
        for plan in service_plans:
            score = calculate_lawn_interior_score(plan.cost, interior.budget, interior.budget_tolerance, interior.budget_weight, plan.frequency, interior.frequency, interior.frequency_weight)
            # Append the plan and its score to the list
            scored_service_plans.append({
                'service_plan': plan,
                'score': score
            })
        
        # Sort the scored service plans by score in descending order
        scored_service_plans.sort(key=lambda x: x['score'], reverse=True)
        
        # Serialize the scored service plans
        serializer = ScoredInteriorServicePlanSerializer(scored_service_plans, many=True)
        
        return Response(serializer.data)
    
class ScoredInternetPlans(APIView):
    def get(self, request, property_id):
        # Fetch the Internet instance associated with the property
        internet = get_object_or_404(Internet, property_id=property_id)
        
        # Fetch all InternetServicePlans
        service_plans = InternetServicePlan.objects.all()
        
        # Calculate scores for each service plan and store them in a list
        scored_service_plans = []
        for plan in service_plans:
            score = calculate_internet_score(plan.cost, internet.budget, internet.budget_tolerance, internet.budget_weight, plan.frequency, internet.frequency, internet.frequency_weight)
            # Append the plan and its score to the list
            scored_service_plans.append({
                'service_plan': plan,
                'score': score
            })
        
        # Sort the scored service plans by score in descending order
        scored_service_plans.sort(key=lambda x: x['score'], reverse=True)
        
        # Serialize the scored service plans
        serializer = ScoredInternetServicePlanSerializer(scored_service_plans, many=True)
        
        return Response(serializer.data)
class ScoredPhonePlans(APIView):
    def get(self, request, property_id):
        # Fetch the Phone instance associated with the property
        phone = get_object_or_404(Phone, property_id=property_id)
        
        # Fetch all PhoneServicePlans
        service_plans = PhoneServicePlan.objects.all()
        
        # Calculate scores for each service plan and store them in a list
        scored_service_plans = []
        for plan in service_plans:
            score = calculate_phone_score(plan.cost, phone.budget, phone.budget_tolerance, phone.budget_weight, plan.frequency, phone.frequency, phone.frequency_weight)
            # Append the plan and its score to the list
            scored_service_plans.append({
                'service_plan': plan,
                'score': score
            })
        
        # Sort the scored service plans by score in descending order
        scored_service_plans.sort(key=lambda x: x['score'], reverse=True)
        
        # Serialize the scored service plans
        serializer = ScoredPhoneServicePlanSerializer(scored_service_plans, many=True)
        
        return Response(serializer.data)