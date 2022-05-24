from account.views import LoginAPIView
from account.views import SignupAPIView
from decorator_include import decorator_include
from django.urls import include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LogoutView
from django.urls import path
from django.urls import re_path
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/todo/', decorator_include(login_required, 'todo.urls')),
    path('api/account/', include('account.urls')),
    re_path(r'.*', ensure_csrf_cookie(TemplateView.as_view(template_name="frontend/index.html")))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
