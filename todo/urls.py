from django.urls import path
from todo.views import AcceptInvitationView, ToDoViewSet
from todo.views import MarkToDosDoneAPIView

todo_list = ToDoViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

todo_detail = ToDoViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
urlpatterns = [
    path('mark_done/', MarkToDosDoneAPIView.as_view()),
    path('', todo_list),
    path('<str:id>/accepted/', AcceptInvitationView.as_view()),
    path('<str:id>/', todo_detail),
]