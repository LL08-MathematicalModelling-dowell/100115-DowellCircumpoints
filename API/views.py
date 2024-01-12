from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .utils import get_event_id, generate_coordinates, generate_ordered_pairs, get_count, points_on_circle, convert_coordinates_df, inscribing_squares
from .dowellinscribing import circle_inscribing_api
import json
import numpy as np
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .serializers import *


#Inscribing Squares API
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
            # file_path = 'square.xlsx'
            # excel_file = df.to_excel(file_path, index=False)
            arr = df.to_numpy()
            final_list = arr.tolist()
            # print(df)
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

    
    # (x,y) to (lat, long) conversion
class conversion_api(APIView):
    def post(self,request):
        response = json.loads(request.body)
        length = int(response['length'])
        width = int(response['width'])
        shape = int(response['shape_choice'])
        value = float(response['value'])

        if shape == 0:
            
            # print(df)
            # print("No. of squares that can be inscribed in "+str(length)+"X"+str(width)+" canvas:",count)

            converted_df = convert_coordinates_df(df)
            arr = converted_df.to_numpy()
            converted_coords = arr.tolist()
        return Response({"square_count":count, "actual_coords":cartesian_coords, "converted_coords":converted_coords})

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
        converted_list = [
                    [
                        [f'{num:.10f}' for num in pair] for pair in sub_list
                    ] for sub_list in converted_coords
                ]

        return Response({
            "success": True,
            "message": "The cartesian coordinates were successfully converted to latitude and longitude", 
            "response":{
                "square_count": count,
                "actual_coordinates": cartesian_coords,
                "converted_coordinates": converted_list,
            }  
        }, status=status.HTTP_200_OK)
    
    def circles(self, request):
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

        circle_data = circle_inscribing_api(length = length, width = width, radius = value)
        print(circle_data)
        return Response("calling inscribing api")

    """HANDLE ERROR"""
    def handle_error(self, request): 
        return Response({
            "success": False,
            "message": "Invalid request type"
        }, status=status.HTTP_400_BAD_REQUEST)