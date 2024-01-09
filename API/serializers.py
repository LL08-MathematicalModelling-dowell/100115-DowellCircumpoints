from rest_framework import serializers

class ConvertCoordinatesSerializer(serializers.Serializer):
    length = serializers.IntegerField()
    width = serializers.IntegerField()
    value = serializers.IntegerField()