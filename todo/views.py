from django import dispatch
from django.http import HttpResponse
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
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
    lookup_field = 'id'


    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        query = Q(owner=user) | Q(coworkers=user)
        return queryset.filter(query).distinct()


class MarkToDosDoneAPIView(APIView):

    def patch(self, request, *args, **kwargs):
        ids = request.data.get('ids')
        ToDo.objects.filter(id__in=ids).update(is_done=True)
        return HttpResponse(status=200)


class AcceptInvitationView(APIView):
    queryset = ToDo.objects.all()
    lookup_field = 'id'

    def post(self, request, *args, **kwargs):
        queryset = ToDo.objects.all()
        todo = get_object_or_404(queryset, id=self.kwargs['id'])
        todo.coworkers.add(request.user)
        return HttpResponse(status=200)