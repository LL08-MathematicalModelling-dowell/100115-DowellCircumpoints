from rest_framework import serializers

class ConvertCoordinatesSerializer(serializers.Serializer):
    length = serializers.IntegerField()
    width = serializers.IntegerField()
    value = serializers.FloatField()

class CheckDistanceSerializer(serializers.Serializer):
    radius = serializers.FloatField()
    reference_point = serializers.ListField(
        child = serializers.FloatField(),
        min_length = 2,
        max_length = 2
    )
    locations = serializers.ListField(
        child = serializers.ListField(
            child = serializers.FloatField()
        )
    )
    unit = serializers.ChoiceField(choices=['meters','kilometers'], default='meters')