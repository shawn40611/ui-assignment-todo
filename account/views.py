from django.http import HttpResponse
from account.serializers import UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth.views import LoginView
from django.http.response import JsonResponse
from django.contrib.auth import logout
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView


class LoginAPIView(LoginView):
    template_name = "frontend/index.html"

    def form_valid(self, form):
        super().form_valid(form)
        return HttpResponse(status=200)

    def form_invalid(self, form) :
        return JsonResponse({
            'error': "Login Failed"
        }, status=401)

class SignupAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class IsLoginView(APIView):
    def get(self, request, *args, **kwargs):
        return JsonResponse({'is_login': request.user.is_authenticated})


class LogoutAPIView(APIView):
    def get(self, request, *args, **kwargs):
        logout(request)
        return HttpResponse(status=200)