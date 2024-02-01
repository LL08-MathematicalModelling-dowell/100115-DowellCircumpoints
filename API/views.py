from django.shortcuts import render
# from .api import inscribing_square_api
from IPython.display import HTML
from .utils import generate_coordinates, generate_ordered_pairs
from .dowellinscribing import circle_inscribing_api
import json
import numpy as np

#landing page 
def experimental_frontend_view(request):
    return render(request, 'form.html')

#function to call inscribing square api
def get_square_dataframe(length, width, side):
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
    table = df.to_html()
    num = df.count().sum()
    
    return table, num

#rendering the inscribing results
def inscribing_api_view(request):
    if request.method == "GET":
        dataType = request.GET.get('dataType')
        shape = request.GET.get('shapeType')
        canvasLength = int(request.GET.get('length'))
        canvasWidth = int(request.GET.get('width'))
        gpsDeviceCenters = request.GET.get('gpsDeviceCenters','')

        data = {
                    'shape':shape,
                    'dataType':dataType,
                    'canvasLength':canvasLength,
                    'canvasWidth':canvasWidth,
                }
        
        if shape == 'circles':
            circleRadius = int(request.GET.get('circleRadius',''))
            
            output = json.loads(circle_inscribing_api(length = canvasLength, width = canvasWidth, radius = circleRadius))

            data['circleRadius'] = circleRadius
            data['output'] = output
            
            return render(request,'inscribe.html',data)
    
        elif shape == 'squares':
            sideLength = int(request.GET.get('squareSideLength',''))
            output = {}
        
            table, num = get_square_dataframe(length = canvasLength, width = canvasWidth, side = sideLength)
            
            output['table'] = table
            output['numberOfCircles'] = num
            
            data['sideLength'] = sideLength
            data['output'] = output
            
            return render(request,'inscribe.html',data)
        else:
            return("Invalid shape type. Please provide the correct data")
    else:
        return("Method not allowed")
        
        
    
