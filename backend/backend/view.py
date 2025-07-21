from rest_framework import viewsets
from rest_framework.response import Response

class Test(viewsets.ViewSet):
     def list(self, request):
         return Response({"message": "This is a test endpoint"});
    