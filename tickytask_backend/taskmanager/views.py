# taskmanager/views.py

from rest_framework import viewsets
from .models import Task, TaskList
from .serializers import TaskSerializer, TaskListSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskListViewSet(viewsets.ModelViewSet):
    queryset = TaskList.objects.all()
    serializer_class = TaskListSerializer
