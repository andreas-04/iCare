from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import MortgageInsurance, Lawn, Interior, Internet, Phone, ServicePlan

class UserSerializer(serializers.ModelSerializer):
    groups = serializers.SlugRelatedField(
        queryset=Group.objects.all(),
        slug_field='name',
        many=True,
        required=False,  # Make this field optional
        help_text='Select the group to add the user to.'
    )
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'groups']
    def create(self, validated_data):
        groups = validated_data.pop('groups', [])
        user = User.objects.create(**validated_data)
        for group in groups:
            user.groups.add(group)
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

class ServicePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicePlan
        fields = '__all__'