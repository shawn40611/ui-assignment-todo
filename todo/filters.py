from django_filters import FilterSet
from todo.models import ToDo

class ToDoFilter(FilterSet):

    class Meta:
        model = ToDo
        fields = ['title', 'is_done']
