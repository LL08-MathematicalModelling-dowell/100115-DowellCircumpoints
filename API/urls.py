from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('', views.index),
    path('functionInputs/', views.functionInputs),
    path('processapi/', views.inscribingAPI),
    path('api',views.publicAPI),
    path('square_api',inscribing_square_api.as_view())
]
