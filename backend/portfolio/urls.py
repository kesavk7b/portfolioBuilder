from django.urls import path
from .views import PortfolioViewSet

urlpatterns = [
    path('portfolios/', PortfolioViewSet.as_view({'get': 'list', 'post': 'create'}), name='portfolio-list'),
    path('portfolios/<int:pk>/', PortfolioViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='portfolio-detail'),
]