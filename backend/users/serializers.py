from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)

    class Meta:
        model = User
        fields = ['username','email','password']

    def create(self,validated_data):
        print(validated_data,"test")
        user = User.objects.create_user(
            username=validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password']
        )
        return user