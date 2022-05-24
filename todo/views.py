from django import dispatch
from django.http import HttpResponse
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from todo.models import ToDo
from todo.filters import ToDoFilter
from todo.serializers import ToDoSerializer


class ToDoViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ToDoFilter


    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(owner=self.request.user)


class MarkToDosDoneAPIView(APIView):

    def patch(self, request, *args, **kwargs):
        ids = request.data.get('ids')
        ToDo.objects.filter(id__in=ids).update(is_done=True)
        return HttpResponse(status=200)