from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import HiddenField
from rest_framework.serializers import CurrentUserDefault
from hashid_field.rest import HashidSerializerCharField
from todo.models import ToDo

class ToDoSerializer(ModelSerializer):
    owner = HiddenField(default=CurrentUserDefault())
    id = HashidSerializerCharField(source_field="todo.ToDo.id", read_only=True)
    class Meta:
        model = ToDo
        fields = [
            'title',
            'detail',
            'owner',
            'is_done',
            'id'
        ]