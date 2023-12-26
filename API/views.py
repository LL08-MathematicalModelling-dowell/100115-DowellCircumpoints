# from django.shortcuts import render
# from django.http import HttpResponse
# from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .inscribe_square import generate_coordinates, generate_ordered_pairs, get_count
import json

#Inscribing Sqaures API
class inscribing_square_api(APIView):
    def post(self,request):
        try:
            response = json.loads(request.body)
            length = int(response['length'])
            width = int(response['width'])
            side = int(response['side_length'])

            if 'length' not in response or 'width' not in response or 'side_length' not in response:
                raise ValueError("Invalid input. Please provide 'length', 'width', and 'side_length'.")

            if length <= 0 or width <= 0 or side <= 0:
                raise ValueError("Length, width, and side length must be positive integers.")


            w1,w2 = generate_coordinates(start=0,limit=length,step=side)
            df = generate_ordered_pairs(w1,w2)
            count = get_count(df)
            # file_path = 'square.xlsx'
            # excel_file = df.to_excel(file_path, index=False)
            arr = df.to_numpy()
            final_list = arr.tolist()
            # print(df)
            print("No. of squares that can be inscribed in "+str(length)+"X"+str(width)+" canvas:",count)

            return Response({"square count":count, "center coordinates": final_list},status=status.HTTP_200_OK)

        except ValueError as ve:
            error = str(ve)
            return Response({"error_message": error}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            error = str(e)
            return Response({"error_message":error},status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Coordinates on the circumference of a circle
