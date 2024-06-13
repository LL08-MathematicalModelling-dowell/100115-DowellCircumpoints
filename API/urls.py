from django.urls import path
from .api import inscribing_square_api, circumference_api, multi_circumference_api, convert_coordinates_api, check_distance
from .views import experimental_frontend_view, inscribing_api_view
urlpatterns = [
    path('square_api',inscribing_square_api.as_view()),
    path('circumference_api',circumference_api.as_view()),
    path('multi_circumference/',multi_circumference_api.as_view()),
    path('convert_coordinates/',convert_coordinates_api.as_view()),
    path('coordinate-calculator/', experimental_frontend_view, name='coordinate_calculator'),
    path('coordinate-calculator/inscribing_api_view', inscribing_api_view, name='coordinates_page'),
    path('check-distance/', check_distance.as_view(), name = 'check-distance'),
]
