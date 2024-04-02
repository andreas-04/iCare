from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, UserViewSet, MortgageInsuranceViewSet, LawnViewSet, InteriorViewSet, InternetViewSet, PhoneViewSet, LawnServicePlanViewSet, InteriorServicePlanViewSet, InternetServicePlanViewSet, PhoneServicePlanViewSet, logout_view, PropertyViewSet, ScoredLawnPlans, ScoredInteriorPlans, ScoredInternetPlans, ScoredPhonePlans

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'mortgage_insurance', MortgageInsuranceViewSet)
router.register(r'lawn', LawnViewSet)
router.register(r'interior', InteriorViewSet)
router.register(r'internet', InternetViewSet)
router.register(r'phone', PhoneViewSet)

router.register(r'lawn_service_plan', LawnServicePlanViewSet)
router.register(r'interior_service_plan', InteriorServicePlanViewSet)
router.register(r'internet_service_plan', InternetServicePlanViewSet)
router.register(r'phone_service_plan', PhoneServicePlanViewSet)
router.register(r'property', PropertyViewSet )

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('scored-lawn-plans/<int:property_id>/', ScoredLawnPlans.as_view(), name='scored-lawn-plans'),
    path('scored-interior-plans/<int:property_id>/', ScoredInteriorPlans.as_view(), name='scored-interior-plans'),
    path('scored-internet-plans/<int:property_id>/', ScoredInternetPlans.as_view(), name='scored-internet-plans'),
    path('scored-phone-plans/<int:property_id>/', ScoredPhonePlans.as_view(), name='scored-phone-plans'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', logout_view, name='logout'),

]