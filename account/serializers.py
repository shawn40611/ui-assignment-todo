from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

    def save(self, *args, **kwargs):
        user = super().save(username=self.validated_data['username'])
        user.set_password(self.validated_data['password'])
        user.save()
        return user
