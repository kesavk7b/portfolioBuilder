from django.urls import path
from .views import testapi,RegisterUser
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('test/',testapi),
    path('register/',RegisterUser.as_view(),name = "Register"),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]