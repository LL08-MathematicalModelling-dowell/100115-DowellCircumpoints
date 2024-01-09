from django.urls import path
from .views import inscribing_square_api, circumference_api, conversion_api

urlpatterns = [
    path('square_api',inscribing_square_api.as_view()),
    path('circumference_api',circumference_api.as_view()),
    path('conversion',conversion_api.as_view())
]
