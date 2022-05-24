from django.db import models
from hashid_field import HashidAutoField
from django.contrib.auth.models import User

# Create your models here.

class ToDo(models.Model):
    id = HashidAutoField(primary_key=True)
    title = models.CharField(max_length=20)
    detail = models.CharField(max_length=150)
    is_done = models.BooleanField(default=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)