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
from .models import MortgageInsurance, Lawn, Interior, Internet, Phone, Property, LawnServicePlan, InternetServicePlan, InteriorServicePlan, PhoneServicePlan, Notification, LawnMatchNotification, InteriorMatchNotification, InternetMatchNotification, PhoneMatchNotification
from .serializers import UserSerializer, MortgageInsuranceSerializer, LawnSerializer, InteriorSerializer, InternetSerializer, PhoneSerializer, LawnServicePlanSerializer, InteriorServicePlanSerializer, InternetServicePlanSerializer, PhoneServicePlanSerializer, PropertySerializer, NotificationSerializer, LawnMatchNotificationSerializer, InteriorMatchNotificationSerializer, InternetMatchNotificationSerializer, PhoneMatchNotificationSerializer
from django.http import JsonResponse
from django.contrib.auth import logout
from .complex_scoring_functions import calculate_internet_score, calculate_lawn_interior_score, calculate_phone_score
from .serializers import ScoredLawnServicePlanSerializer, ScoredInteriorServicePlanSerializer, ScoredInternetServicePlanSerializer, ScoredPhoneServicePlanSerializer
from django.db.models import Sum

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
            response.set_cookie('user_id', user.id, max_age=30*24*60*60, httponly=False, secure=False, samesite='None')
            return response
        
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

def logout_view(request):
    logout(request)
    response = JsonResponse({'message': 'Successfully logged out.'})
    response.delete_cookie('user_id')
    response.delete_cookie('csrftoken')
    return response

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
class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class LawnMatchNotificationViewSet(viewsets.ModelViewSet):
    queryset = LawnMatchNotification.objects.all()
    serializer_class = LawnMatchNotificationSerializer

class InteriorMatchNotificationViewSet(viewsets.ModelViewSet):
    queryset = InteriorMatchNotification.objects.all()
    serializer_class = InteriorMatchNotificationSerializer

class InternetMatchNotificationViewSet(viewsets.ModelViewSet):
    queryset = InternetMatchNotification.objects.all()
    serializer_class = InternetMatchNotificationSerializer

class PhoneMatchNotificationViewSet(viewsets.ModelViewSet):
    queryset = PhoneMatchNotification.objects.all()
    serializer_class = PhoneMatchNotificationSerializer
    



class ScoredLawnPlans(APIView):
    def get(self, request, property_id):
        # Fetch the Lawn instance associated with the property
        lawn = get_object_or_404(Lawn, property_id=property_id)
        
        # Fetch all LawnServicePlans
        service_plans = LawnServicePlan.objects.filter(property_id__isnull=True)
        
        # Calculate scores for each service plan and store them in a list
        scored_service_plans = []
        for plan in service_plans:
            score = calculate_lawn_interior_score(plan.cost, lawn.budget, lawn.budget_tolerance, lawn.budget_weight, plan.frequency, lawn.frequency, lawn.frequency_weight)
            # Append the plan and its score to the list
            if score > 0:
                scored_service_plans.append({
                    'service_plan': plan,
                    'score': score
                })
        
        # Sort the scored service plans by score in descending order
        scored_service_plans.sort(key=lambda x: x['score'], reverse=True)
        
        # Serialize the scored service plans
        serializer = ScoredLawnServicePlanSerializer(scored_service_plans[:5], many=True)
        
        return Response(serializer.data)

class ScoredInteriorPlans(APIView):
    def get(self, request, property_id):
        # Fetch the Interior instance associated with the property
        interior = get_object_or_404(Interior, property_id=property_id)
        
        # Fetch all InteriorServicePlans
        service_plans = InteriorServicePlan.objects.filter(property_id__isnull=True)
        
        # Calculate scores for each service plan and store them in a list
        scored_service_plans = []
        for plan in service_plans:
            score = calculate_lawn_interior_score(plan.cost, interior.budget, interior.budget_tolerance, interior.budget_weight, plan.frequency, interior.frequency, interior.frequency_weight)
            # Append the plan and its score to the list
            if score > 0:
                scored_service_plans.append({
                    'service_plan': plan,
                    'score': score
                })
        
        # Sort the scored service plans by score in descending order
        scored_service_plans.sort(key=lambda x: x['score'], reverse=True)
        
        # Serialize the scored service plans
        serializer = ScoredInteriorServicePlanSerializer(scored_service_plans[:5], many=True)
        
        return Response(serializer.data)
    
class ScoredInternetPlans(APIView):
    def get(self, request, property_id):
        # Fetch the Internet instance associated with the property
        internet = get_object_or_404(Internet, property_id=property_id)
        
        # Fetch all InternetServicePlans
        service_plans = InternetServicePlan.objects.filter(property_id__isnull=True)
        
        # Calculate scores for each service plan and store them in a list
        scored_service_plans = []
        for plan in service_plans:
            score = calculate_internet_score(plan.cost, internet.budget, internet.budget_tolerance, internet.budget_weight, plan.speed, internet.speed_requirements, internet.speed_tolerance, internet.speed_weight, plan.users, internet.users, internet.users_weight)
            # Append the plan and its score to the list
            if score > 0:
                scored_service_plans.append({
                    'service_plan': plan,
                    'score': score
                })
        
        # Sort the scored service plans by score in descending order
        scored_service_plans.sort(key=lambda x: x['score'], reverse=True)
        

        # Serialize the scored service plans
        serializer = ScoredInternetServicePlanSerializer(scored_service_plans[:5], many=True)
        
        return Response(serializer.data)
class ScoredPhonePlans(APIView):
    def get(self, request, property_id):
        # Fetch the Phone instance associated with the property
        phone = get_object_or_404(Phone, property_id=property_id)
        
        # Fetch all PhoneServicePlans
        service_plans = PhoneServicePlan.objects.filter(property_id__isnull=True)
        
        # Calculate scores for each service plan and store them in a list
        scored_service_plans = []
        for plan in service_plans:
            score = calculate_phone_score(plan.cost, phone.budget, phone.budget_tolerance, phone.budget_weight, phone.users, plan.users, phone.users_weight, phone.preferred_plan_type, plan.plan_type, phone.plan_weight)
            # Append the plan and its score to the list
            if score > 0:
                scored_service_plans.append({
                    'service_plan': plan,
                    'score': score
                })
            
        # Sort the scored service plans by score in descending order
        scored_service_plans.sort(key=lambda x: x['score'], reverse=True)

        top_5_scored_service_plans = scored_service_plans[:5]

        # Serialize the scored service plans
        serializer = ScoredPhoneServicePlanSerializer(top_5_scored_service_plans, many=True)
        
        return Response(serializer.data)
    
class active_plans(APIView):
    def get(self, request, property_id):
        active_lawn_plans = LawnServicePlan.objects.filter(property_id = property_id, handshake=True)
        active_interior_plans = InteriorServicePlan.objects.filter(property_id = property_id, handshake=True)
        active_phone_plans = PhoneServicePlan.objects.filter(property_id = property_id, handshake=True)
        active_internet_plans = InternetServicePlan.objects.filter(property_id = property_id, handshake=True)

        lawn_plans_data = LawnServicePlanSerializer(active_lawn_plans, many=True).data
        interior_plans_data = InteriorServicePlanSerializer(active_interior_plans, many=True).data
        phone_plans_data = PhoneServicePlanSerializer(active_phone_plans, many=True).data
        internet_plans_data = InternetServicePlanSerializer(active_internet_plans, many=True).data
        
        # Combine all serialized data into a single dictionary
        all_active_plans_data = {
            'lawn_plans': lawn_plans_data,
            'interior_plans': interior_plans_data,
            'phone_plans': phone_plans_data,
            'internet_plans': internet_plans_data,
        }
        return Response(all_active_plans_data, status=status.HTTP_200_OK)
class all_business_plans(APIView):
    def get(self, request, user_id):
        lawn_plans = LawnServicePlan.objects.filter(business_id = user_id)
        interior_plans = InteriorServicePlan.objects.filter(business_id = user_id)
        phone_plans = PhoneServicePlan.objects.filter(business_id = user_id)
        internet_plans = InternetServicePlan.objects.filter(business_id = user_id)

        lawn_plans_data = LawnServicePlanSerializer(lawn_plans, many=True).data
        interior_plans_data = InteriorServicePlanSerializer(interior_plans, many=True).data
        phone_plans_data = PhoneServicePlanSerializer(phone_plans, many=True).data
        internet_plans_data = InternetServicePlanSerializer(internet_plans, many=True).data
        
        # Combine all serialized data into a single dictionary
        all_active_plans_data = {
            'lawn_plans': lawn_plans_data,
            'interior_plans': interior_plans_data,
            'phone_plans': phone_plans_data,
            'internet_plans': internet_plans_data,
        }
        return Response(all_active_plans_data, status=status.HTTP_200_OK)

class pending_business_plans(APIView):
    def get(self, request, user_id):
        pending_lawn_plans = LawnServicePlan.objects.filter(business_id = user_id, handshake=False).exclude(property=None)
        pending_interior_plans = InteriorServicePlan.objects.filter(business_id = user_id, handshake=False).exclude(property=None)
        pending_phone_plans = PhoneServicePlan.objects.filter(business_id = user_id, handshake=False).exclude(property=None)
        pending_internet_plans = InternetServicePlan.objects.filter(business_id = user_id, handshake=False).exclude(property=None)

        lawn_plans_data = LawnServicePlanSerializer(pending_lawn_plans, many=True).data
        interior_plans_data = InteriorServicePlanSerializer(pending_interior_plans, many=True).data
        phone_plans_data = PhoneServicePlanSerializer(pending_phone_plans, many=True).data
        internet_plans_data = InternetServicePlanSerializer(pending_internet_plans, many=True).data
        
        # Combine all serialized data into a single dictionary
        all_active_plans_data = {
            'lawn_plans': lawn_plans_data,
            'interior_plans': interior_plans_data,
            'phone_plans': phone_plans_data,
            'internet_plans': internet_plans_data,
        }
        return Response(all_active_plans_data, status=status.HTTP_200_OK) 

class active_business_plans(APIView):
    def get(self, request, user_id):
        active_lawn_plans = LawnServicePlan.objects.filter(business_id = user_id, handshake=True)
        active_interior_plans = InteriorServicePlan.objects.filter(business_id = user_id, handshake=True)
        active_phone_plans = PhoneServicePlan.objects.filter(business_id = user_id, handshake=True)
        active_internet_plans = InternetServicePlan.objects.filter(business_id = user_id, handshake=True)

        lawn_plans_data = LawnServicePlanSerializer(active_lawn_plans, many=True).data
        interior_plans_data = InteriorServicePlanSerializer(active_interior_plans, many=True).data
        phone_plans_data = PhoneServicePlanSerializer(active_phone_plans, many=True).data
        internet_plans_data = InternetServicePlanSerializer(active_internet_plans, many=True).data
        
        # Combine all serialized data into a single dictionary
        all_active_plans_data = {
            'lawn_plans': lawn_plans_data,
            'interior_plans': interior_plans_data,
            'phone_plans': phone_plans_data,
            'internet_plans': internet_plans_data,
        }
        return Response(all_active_plans_data, status=status.HTTP_200_OK) 



class budget(APIView):
    def get(self, request, property_id):
        property_instance = get_object_or_404(Property, id=property_id)
        total_lawn_budget = Lawn.objects.filter(property=property_instance).aggregate(total_budget=Sum('budget'))['total_budget'] or 0
        total_interior_budget = Interior.objects.filter(property=property_instance).aggregate(total_budget=Sum('budget'))['total_budget'] or 0
        total_phone_budget = Phone.objects.filter(property=property_instance).aggregate(total_budget=Sum('budget'))['total_budget'] or 0
        total_internet_budget = Internet.objects.filter(property=property_instance).aggregate(total_budget=Sum('budget'))['total_budget'] or 0
        
        total_budget = total_lawn_budget + total_interior_budget + total_phone_budget + total_internet_budget

        active_lawn_plans = LawnServicePlan.objects.filter(property=property_instance, handshake=True).aggregate(total_cost=Sum('cost'))['total_cost'] or 0
        active_interior_plans = InteriorServicePlan.objects.filter(property=property_instance, handshake=True).aggregate(total_cost=Sum('cost'))['total_cost'] or 0
        active_phone_plans = PhoneServicePlan.objects.filter(property=property_instance, handshake=True).aggregate(total_cost=Sum('cost'))['total_cost'] or 0
        active_internet_plans = InternetServicePlan.objects.filter(property=property_instance, handshake=True).aggregate(total_cost=Sum('cost'))['total_cost'] or 0

        # Calculate the total cost of all active plans
        total_active_plans_cost = active_lawn_plans + active_interior_plans + active_phone_plans + active_internet_plans
        # Return the total budget and total cost of all active plans
        return Response({
            'total_budget': total_budget,
            'total_active_plans_cost': total_active_plans_cost
        }, status=status.HTTP_200_OK)

class UserNotificationsView(APIView):
    def get(self, request, user_id):
        # Fetch the user instance
        user = get_object_or_404(User, id=user_id)
        
        # Fetch all notifications sent to the user
        notifications = Notification.objects.filter(receiver=user)
        
        # Fetch all match notifications sent to the user
        lawn_match_notifications = LawnMatchNotification.objects.filter(receiver=user)
        interior_match_notifications = InteriorMatchNotification.objects.filter(receiver=user)
        internet_match_notifications = InternetMatchNotification.objects.filter(receiver=user)
        phone_match_notifications = PhoneMatchNotification.objects.filter(receiver=user)
        
        # Serialize the notifications and match notifications
        notification_serializer = NotificationSerializer(notifications, many=True)
        lawn_match_notification_serializer = LawnMatchNotificationSerializer(lawn_match_notifications, many=True)
        interior_match_notification_serializer = InteriorMatchNotificationSerializer(interior_match_notifications, many=True)
        internet_match_notification_serializer = InternetMatchNotificationSerializer(internet_match_notifications, many=True)
        phone_match_notification_serializer = PhoneMatchNotificationSerializer(phone_match_notifications, many=True)
        
        # Combine all serialized data into a single dictionary
        all_notifications_data = {
            'notifications': notification_serializer.data,
            'lawn_match_notifications': lawn_match_notification_serializer.data,
            'interior_match_notifications': interior_match_notification_serializer.data,
            'internet_match_notifications': internet_match_notification_serializer.data,
            'phone_match_notifications': phone_match_notification_serializer.data,
        }
        
        # Return the combined serialized data
        return Response(all_notifications_data, status=status.HTTP_200_OK)
    
class ScoredPlanProperties(APIView):
    def get(self, request, plan_id, plan_type):
        # Map plan types to their corresponding models, scoring functions, and notification models
        plan_info_mapping = {
            'lawn': (LawnServicePlan, calculate_lawn_interior_score, LawnMatchNotification),
            'interior': (InteriorServicePlan, calculate_lawn_interior_score, InteriorMatchNotification),
            'internet': (InternetServicePlan, calculate_internet_score, InternetMatchNotification),
            'phone': (PhoneServicePlan, calculate_phone_score, PhoneMatchNotification),
        }

        # Fetch the plan instance based on the plan_id and plan_type
        PlanModel, scoring_function, NotificationModel = plan_info_mapping.get(plan_type, (None, None, None))
        if not PlanModel or not scoring_function or not NotificationModel:
            return Response({"detail": "Invalid plan type."}, status=status.HTTP_400_BAD_REQUEST)

        plan = get_object_or_404(PlanModel, id=plan_id)

        # Calculate scores for all properties based on the plan
        scored_properties = []
        for property in Property.objects.all():
            # Fetch the plan type instance associated with the property
            if plan_type == 'lawn':
                plan_instance = property.lawn
            elif plan_type == 'interior':
                plan_instance = property.interior
            elif plan_type == 'internet':
                plan_instance = property.internet
            elif plan_type == 'phone':
                plan_instance = property.phone
            else:
                continue # Skip this property if the plan type is not recognized

            # Ensure the plan instance exists
            if not plan_instance:
                continue # Skip this property if there's no associated plan type instance

            # Calculate the score using the plan instance data
            score = scoring_function(plan.cost, plan_instance.budget, plan_instance.budget_tolerance, plan_instance.budget_weight, plan.frequency, plan_instance.frequency, plan_instance.frequency_weight)
            if score > 0:
                scored_properties.append({
                    'property': property,
                    'score': score
                })

        # Sort the scored properties by score in descending order
        scored_properties.sort(key=lambda x: x['score'], reverse=True)

        # Find the property with the highest score
        best_match_property = scored_properties[0]['property'] if scored_properties else None

        if best_match_property:
            # Extract the user ID from the property
            user_id = best_match_property.user_id

            sender_id = plan.business.id

            # Create and send a notification to the user using the specific notification model
            notification = NotificationModel.objects.create(receiver_id=user_id, match_id=plan_id, sender_id = sender_id)
            notification_serializer = globals()[f"{NotificationModel.__name__}Serializer"](notification)

            return Response(notification_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "No properties matched the plan."}, status=status.HTTP_404_NOT_FOUND)