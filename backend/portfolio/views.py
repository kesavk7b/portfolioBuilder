from rest_framework import viewsets;
from .models import Portfolio
from .serializers import PortfolioSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class PortfolioViewSet(viewsets.ModelViewSet):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

    def perform_create(self, serializer):
        serializer.save()  # You can add custom logic here if needed

    def perform_update(self, serializer):
        serializer.save()
    
    @action(detail = False,methods=['get'], url_path = 'tets')
    def test_action(self, request):
        return Response({"message": "This is a test action"}, status=status.HTTP_200_OK)    