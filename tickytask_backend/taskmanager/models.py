# tickytas_backend/taskmanager/models.py

from django.apps import AppConfig


class TaskmanagerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'taskmanager'


from django.db import models

class TaskList(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Task(models.Model):
    title = models.CharField(max_length=255)
    start_time = models.TimeField()
    end_time = models.TimeField()
    completed = models.BooleanField(default=False)
    task_list = models.ForeignKey(TaskList, related_name='tasks', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
