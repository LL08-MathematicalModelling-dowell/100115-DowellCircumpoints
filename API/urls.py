from django.urls import path
from .api import inscribing_square_api, circumference_api, multi_circumference_api, convert_coordinates_api
from .views import experimental_frontend_view
urlpatterns = [
    path('square_api',inscribing_square_api.as_view()),
    path('circumference_api',circumference_api.as_view()),
    path('multi_circumference/',multi_circumference_api.as_view()),
    path('convert_coordinates/',convert_coordinates_api.as_view()),
    path('coordinate-calculator/', experimental_frontend_view, name='coordinate_calculator')
]
