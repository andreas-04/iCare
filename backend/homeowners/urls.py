from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, UserViewSet, MortgageInsuranceViewSet, LawnViewSet, InteriorViewSet, InternetViewSet, PhoneViewSet, ServicePlanViewSet, MatchServicePlansView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'mortgage_insurance', MortgageInsuranceViewSet)
router.register(r'lawn', LawnViewSet)
router.register(r'interior', InteriorViewSet)
router.register(r'internet', InternetViewSet)
router.register(r'phone', PhoneViewSet)
router.register(r'service_plan', ServicePlanViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('match/', MatchServicePlansView.as_view(), name='match'),

]