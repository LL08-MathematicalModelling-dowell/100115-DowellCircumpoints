from django.urls import path
from .views import *

urlpatterns = [
    path('square_api',inscribing_square_api.as_view()),
    path('circumference_api',circumference_api.as_view()),
    path('conversion',conversion_api.as_view()),
    path('convert_coordinates/',convert_coordinates_api.as_view())
]
