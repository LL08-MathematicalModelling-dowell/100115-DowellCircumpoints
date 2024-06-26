from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .utils import generate_coordinates, generate_ordered_pairs, get_count, get_event_id, points_on_circle, points_on_circles_dict, find_intersection_points,convert_coordinates_df, inscribing_squares, haversine_distance
from .dowellinscribing import circle_inscribing_api
import json
import time
import numpy as np
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .serializers import *
from geopy.distance import geodesic


#Inscribing Squares API
@method_decorator(csrf_exempt, name='dispatch')
class inscribing_square_api(APIView):
    def post(self,request):
        try:
            response = json.loads(request.body)
            length = int(response['length'])
            width = int(response['width'])
            side = int(response['side_length'])

            if length <= 0 or width <= 0 or side <= 0:
                raise ValueError("Length, width, and side length must be positive integers.")


            w1,w2 = generate_coordinates(start=0,limit=length,step=side)
            list1 = np.flip(w1)
            list1 = np.append(list1, w2)
            x_num = len(w1)
            print(list1)
            print("Total no. of X-coordinates: ", x_num)

            w1,w2 = generate_coordinates(start=0,limit=width,step=side)
            list2 = np.flip(w2)
            list2 = np.append(list2, w1)
            y_num = len(w2)
            print(list2)
            print("Total no. of Y-coordinates: ", y_num)
            
            df = generate_ordered_pairs(list1,list2)
            
            count = get_count(df)
            arr = df.to_numpy()
            final_list = arr.tolist()
            
            print("No. of squares that can be inscribed in "+str(length)+"X"+str(width)+" canvas:",count)
            
            event = get_event_id()
            
            return Response({"event_id":event["event_id"], "square_count":count, "center_coordinates": final_list},status=status.HTTP_200_OK)

        except ValueError as ve:
            error = str(ve)
            return Response({"error_message": error}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            error = str(e)
            return Response({"error_message":error},status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Coordinates on the circumference of a circle
@method_decorator(csrf_exempt, name='dispatch')
class circumference_api(APIView):
    def post(self,request):
        try:
            response = json.loads(request.body)
            print(response)

            center_x = float(response['center_x'])
            center_y = float(response['center_y'])
            radius = float(response['radius'])
            num_points = int(response['num_of_points'])

            if radius<0:
                raise ValueError("Radius cannot be negative")

            if num_points<=0:
                raise ValueError("Number of points should be a positive number")

            circle_points = points_on_circle(center_x, center_y, radius, num_points)
            event = get_event_id()

            return Response({"event_id":event["event_id"],'coordinates':circle_points})

        except ValueError as ve:
            error = str(ve)
            return Response({"error_message": error}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            error = str(e)
            return Response({"error_message":error},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# multi-circle circumference API
@method_decorator(csrf_exempt, name='dispatch')
class multi_circumference_api(APIView):
    def post(self,request):
        try:
            start_time = time.time()
            response = json.loads(request.body)
            gps_device_centers = response['gps_device_centers']
            radius = float(response['radius'])
            num_points = 360

            if radius<0:
                raise ValueError("Radius cannot be negative")

            circle_points = points_on_circles_dict(gps_device_centers, radius, num_points)
            points_of_intersection = find_intersection_points(gps_device_centers, radius, num_points)
            num_of_points = len(points_of_intersection)
            gps_device_count = len(gps_device_centers)

            event = get_event_id()
           
            end_time = time.time()
            response_time =  end_time - start_time

            return Response({"success":True,"event_id":event["event_id"],"response_time_seconds": response_time,'gps_device_count':gps_device_count,'circum_points_dict':circle_points,"total_points_of_intersection":num_of_points, "points_of_intersection":points_of_intersection})

        except ValueError as ve:
            error = str(ve)
            return Response({"error_message": error}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            error = str(e)
            return Response({"error_message":error},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
# (x,y) to (lat, long) conversion
@method_decorator(csrf_exempt, name='dispatch')
class convert_coordinates_api(APIView):
    def get(self, request):
        type_request = request.GET.get('type')

        if type_request == "squares":
            return self.square(request)
        elif type_request == "circles":
            return self.circles(request)
        else:
            return self.handle_error(request)
    
    def square(self, request):
        length = int(request.GET.get('length'))
        width = int(request.GET.get('width'))
        value = float(request.GET.get('value'))

        serializer = ConvertCoordinatesSerializer(data={"length": length,"width": width,"value": value})

        if not serializer.is_valid():
            return Response({
                "success": False,
                "message": "Posting wrong data to API",
                
                "error": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        count, df, cartesian_coords = inscribing_squares(length = length, width = width, side = value)
        
        converted_df = convert_coordinates_df(df)
        arr = converted_df.to_numpy()
        converted_coords = arr.tolist()
        # converted_list = [
        #             [
        #                 [f'{num:.10f}' for num in pair] for pair in sub_list
        #             ] for sub_list in converted_coords
        #         ]

        return Response({
            "success": True,
            "message": "The cartesian coordinates were successfully converted to latitude and longitude", 
            "response":{
                "square_count": count,
                "actual_coordinates": cartesian_coords,
                "converted_coordinates": converted_coords,
            }  
        }, status=status.HTTP_200_OK)
    
    def circles(self, request):
        length = int(request.GET.get('length'))
        width = int(request.GET.get('width'))
        value = float(request.GET.get('value'))

        serializer = ConvertCoordinatesSerializer(data={"length": length,"width": width,"value": value})

        if not serializer.is_valid():
            return Response({
                "success": "false",
                "message": "Posting wrong data to API",
                "error": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        circle_data = json.loads(circle_inscribing_api(length = length, width = width, radius = value))
        cartesian_coords = circle_data["coordinates"]
        count = circle_data["numberOfCircles"]

        converted_coords = [
                           ['{:.15f}'.format(pair[1]*0.000008987), '{:.15f}'.format(pair[0]*0.000008987)] for pair in cartesian_coords
                         ]
        # print(converted_list)

        return Response({
            "success": True,
            "message": "The cartesian coordinates were successfully converted to latitude and longitude", 
            "response":{
                "circle_count": count,
                "actual_coordinates": cartesian_coords,
                "converted_coordinates": converted_coords,
            }  
        }, status=status.HTTP_200_OK)

    # Handling errors
    def handle_error(self, request): 
        return Response({
            "success": False,
            "message": "Invalid request type"
        }, status=status.HTTP_400_BAD_REQUEST)
    

# check distance of a location from a reference point
class check_distance(APIView):
    def post(self, request):
        try:
            serializer = CheckDistanceSerializer(data = request.data)
            
            if serializer.is_valid():
                radius = serializer.validated_data['radius']
                reference_point = serializer.validated_data['reference_point']
                locations = serializer.validated_data['locations']
                unit = serializer.validated_data['unit']
               
                reference_location = [reference_point[0], reference_point[1]]
                circumference_points = points_on_circle(reference_point[0], reference_point[1], radius, num_points=360)
               
                results = []
                for location in locations:
                    current_location = [(location[0], location[1])]
                    common_points = set(current_location).intersection(circumference_points)
                    
                    if len(common_points) !=0:
                        locations_on_circumference = common_points
                    else:
                        locations_on_circumference = f"no location is excatly at {radius} {unit} distance"
                    
                    distance = haversine_distance(reference_location[0], reference_location[1], location[0], location[1], unit)
                        
                    within_distance = distance <= radius
                    results.append({
                        'location': current_location,
                        'distance': distance,
                        'within_distance': within_distance
                    })

                return Response({"success":"true",
                                 "message":"Location verification successful",
                                 
                                 "results":{
                                            "unit_of_measurement":unit,
                                            "reference_point":reference_point,
                                            "locations_on_circumference":locations_on_circumference,
                                            "distance_data":results},
                                "event_id":get_event_id().get("event_id",{})
                                }, status=status.HTTP_200_OK)
            else:
                return Response({
                                "success": "false",
                                "message": "Posting wrong data to API",
                                "error": serializer.errors
                            }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"sucess":"false",
                             "message":"Unexpected error occured. Contact admin.",
                             "error": str(e)},status=status.HTTP_400_BAD_REQUEST)        
    
