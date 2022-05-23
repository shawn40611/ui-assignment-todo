
from django.http.response import JsonResponse
from django.contrib.auth.views import LoginView


class LoginAPIView(LoginView):
    template_name = "frontend/index.html"

    def form_invalid(self, form) :
        return JsonResponse({
            'error': "Login Failed"
        }, status=401)
