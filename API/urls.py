from django.urls import path
from . import views
from .views import inscribing_square_api

urlpatterns = [
    path('', views.index),
    path('square_api',inscribing_square_api.as_view())
]
