# tickytas_backend/taskmanager/admin.py

from django.contrib import admin
from .models import TaskList, Task

admin.site.register(TaskList)
admin.site.register(Task)
