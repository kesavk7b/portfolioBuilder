from rest_framework import serializers
from .models import Portfolio, Saved_like

class PortfolioSerializer(serializers.ModelSerializer):
    is_liked = serializers.BooleanField(read_only=True)
    class Meta:
        model = Portfolio
        fields = ['id', 'title', 'description', 'data', 'like_count', 'view_count', 'img_url', 'created_at', 'updated_at', 'is_liked']

class SaveAndLikeSerializer(serializers.Serializer):
    like = serializers.BooleanField(required=False, default=False)

    def validate(self, data):
        if not data.get('save') and not data.get('like'):
            raise serializers.ValidationError("At least one of 'save' or 'like' must be true.")
        return data
    class Meta:
        fields = ['save', 'like']   
        model = Saved_like