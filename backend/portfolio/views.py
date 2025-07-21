from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from django.db.models import Exists, OuterRef, Value, BooleanField

from .models import Portfolio, Saved_like
from .serializers import PortfolioSerializer


class PortfolioViewSet(viewsets.ModelViewSet):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    print("PortfolioViewSet initialized")
    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user

        print("User:", user.is_authenticated)
        if user.is_authenticated:
            return Portfolio.objects.annotate(
                is_liked=Exists(
                    Saved_like.objects.filter(user=user, liked=OuterRef('pk'))
                )
            ).select_related()
        else:
            return Portfolio.objects.annotate(
                is_liked=Value(False, output_field=BooleanField())
            )

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

    @action(detail=False, methods=['get'], url_path='test')
    def test_action(self, request):
        return Response({"message": "This is a test action"}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def like(self, request, pk=None):
        portfolio = self.get_object()
        user = request.user

        with transaction.atomic():
            saved_like, created = Saved_like.objects.get_or_create(
                user=user,
                liked=portfolio
            )
            if created:
                portfolio.like_count += 1
                portfolio.save()
                return Response({"detail": "Portfolio liked successfully."}, status=status.HTTP_201_CREATED)
            else:
                return Response({"detail": "You have already liked this portfolio."}, status=status.HTTP_400_BAD_REQUEST)
            

    @action(detail=True, methods=['delete'], permission_classes=[IsAuthenticated], url_path='unlike')
    def unlike(self, request, pk=None):
        Portfolio = self.get_object()
        user = request.user

        try:
            saved_like = Saved_like.objects.get(user=user, liked=Portfolio)
            saved_like.delete()
            Portfolio.like_count = max(Portfolio.like_count - 1, 0)
            Portfolio.save()
            return Response({"detail": "Portfolio unliked successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Saved_like.DoesNotExist:
            return Response({"detail": "You have not liked this portfolio."}, status=status.HTTP_400_BAD_REQUEST)               