from django.urls import path, include
from api.models import Profile
from rest_framework import serializers


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'studentname',
            'qwicklabsurl',
            'EntrolmentStatus',
            'date_joined',
            'track1',
            'track2',
        )
