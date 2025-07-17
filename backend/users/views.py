from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny 
from .serializers import RegisterSerializer
from django.contrib.auth.models import User

from rest_framework.response import Response
from rest_framework import status



# Create your views here.

class RegisterUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print(" Serializer errors:", serializer.errors)  # 👈 DEBUG LOG
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

def testapi():
    pass
