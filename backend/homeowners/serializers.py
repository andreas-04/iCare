from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import MortgageInsurance, Lawn, Interior, Internet, Phone, LawnServicePlan, Property, InteriorServicePlan, InternetServicePlan, PhoneServicePlan, LawnMatchNotification, InteriorMatchNotification, InternetMatchNotification, PhoneMatchNotification, Notification

UserProfile = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'username', 'email', 'phone_number', 'user_type', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserProfile.objects.create_user(**validated_data)
        return user
    
class MortgageInsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MortgageInsurance
        fields = '__all__'

class LawnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lawn
        fields = '__all__'

class InteriorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interior
        fields = '__all__'

class InternetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internet
        fields = '__all__'

class PhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phone
        fields = '__all__'

class LawnServicePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = LawnServicePlan
        fields = '__all__'
class ScoredLawnServicePlanSerializer(serializers.Serializer):
    service_plan = LawnServicePlanSerializer(read_only=True)
    score = serializers.FloatField()


class InteriorServicePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = InteriorServicePlan
        fields = '__all__'
class ScoredInteriorServicePlanSerializer(serializers.Serializer):
    service_plan = InteriorServicePlanSerializer(read_only=True)
    score = serializers.FloatField()

class InternetServicePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = InternetServicePlan
        fields = '__all__'
class ScoredInternetServicePlanSerializer(serializers.Serializer):
    service_plan = InternetServicePlanSerializer(read_only=True)
    score = serializers.FloatField()

class PhoneServicePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneServicePlan
        fields = '__all__'
class ScoredPhoneServicePlanSerializer(serializers.Serializer):
    service_plan = PhoneServicePlanSerializer(read_only=True)
    score = serializers.FloatField()

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'

    def create(self, validated_data): 
        # Create the Property instance
        property_instance = Property.objects.create(**validated_data)

        # Create instances of Lawn, Interior, Internet, and Phone models linked to the Property instance
        lawn = Lawn.objects.create(property=property_instance)
        # property_instance.lawn = lawn
        interior = Interior.objects.create(property=property_instance)
        # property_instance.interior = interior
        internet = Internet.objects.create(property=property_instance)
        # property_instance.internet = internet
        phone = Phone.objects.create(property=property_instance)
        # property_instance.phone = phone
        
        property_instance.lawn = lawn
        property_instance.interior = interior
        property_instance.internet = internet
        property_instance.phone = phone
        property_instance.save()
        return property_instance

class LawnMatchNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LawnMatchNotification
        fields = "__all__"

class InteriorMatchNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = InteriorMatchNotification
        fields = "__all__"

class InternetMatchNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = InternetMatchNotification
        fields = "__all__"

class PhoneMatchNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneMatchNotification
        fields = "__all__"

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"
