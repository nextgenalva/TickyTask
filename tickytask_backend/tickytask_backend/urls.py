# tickytask_backend/tickytask_backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from taskmanager.views import TaskViewSet, TaskListViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'lists', TaskListViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
