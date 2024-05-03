from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, UserViewSet, MortgageInsuranceViewSet, LawnViewSet, InteriorViewSet, InternetViewSet, PhoneViewSet, LawnServicePlanViewSet, InteriorServicePlanViewSet, InternetServicePlanViewSet, PhoneServicePlanViewSet, logout_view, PropertyViewSet, ScoredLawnPlans, ScoredInteriorPlans, ScoredInternetPlans, ScoredPhonePlans, active_plans, budget, active_business_plans, pending_business_plans, all_business_plans, UserNotificationsView, NotificationViewSet, LawnMatchNotificationViewSet, InteriorMatchNotificationViewSet, InternetMatchNotificationViewSet, PhoneMatchNotificationViewSet, ScoredPlanProperties

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
router.register(r'notification', NotificationViewSet)
router.register(r'lawn_match_notification', LawnMatchNotificationViewSet)
router.register(r'interior_match_notification', InteriorMatchNotificationViewSet)
router.register(r'internet_match_notification', InternetMatchNotificationViewSet)
router.register(r'phone_match_notification', PhoneMatchNotificationViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('scored-lawn-plans/<int:property_id>/', ScoredLawnPlans.as_view(), name='scored-lawn-plans'),
    path('scored-interior-plans/<int:property_id>/', ScoredInteriorPlans.as_view(), name='scored-interior-plans'),
    path('scored-internet-plans/<int:property_id>/', ScoredInternetPlans.as_view(), name='scored-internet-plans'),
    path('scored-phone-plans/<int:property_id>/', ScoredPhonePlans.as_view(), name='scored-phone-plans'),
    path('active-plans/<int:property_id>/', active_plans.as_view(), name="active-plans"),
    path('active-business-plans/<int:user_id>/', active_business_plans.as_view(), name="active-business-plans"),
    path('pending-business-plans/<int:user_id>/', pending_business_plans.as_view(), name="pending-business-plans"),
    path('all-business-plans/<int:user_id>/', all_business_plans.as_view(), name="all-business-plans"),
    path('costs-budget/<int:property_id>/', budget.as_view(), name="budgets" ),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', logout_view, name='logout'),
    path('notifications/user/<int:user_id>/', UserNotificationsView.as_view(), name="notifications" ),
    path('scored-plan-properties/<int:plan_id>/<str:plan_type>/', ScoredPlanProperties.as_view(), name='scored-plan-properties'),

]