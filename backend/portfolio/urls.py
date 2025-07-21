from django.urls import path
from .views import PortfolioViewSet

urlpatterns = [
    path('portfolios/', PortfolioViewSet.as_view({'get': 'list', 'post': 'create'}), name='portfolio-list'),
    path('portfolios/<int:pk>/', PortfolioViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='portfolio-detail'),
    path('portfolios/<int:pk>/like/', PortfolioViewSet.as_view({'post': 'like'}), name='portfolio-like'),
    path('portfolios/<int:pk>/unlike/', PortfolioViewSet.as_view({'delete': 'unlike'}), name='portfolio-unlike'),

]