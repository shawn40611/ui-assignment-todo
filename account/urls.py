from django.urls import path
from account import views

urlpatterns = [
    path('logout/', views.LogoutAPIView.as_view()),
    path('login/', views.LoginAPIView.as_view()),
    path('signup/', views.SignupAPIView.as_view()),
    path('is_login/', views.IsLoginView.as_view()),
]
