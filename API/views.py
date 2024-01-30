from django.shortcuts import render
from .api import inscribing_square_api
from .dowellinscribing import circle_inscribing_api
import json

def experimental_frontend_view(request):
    return render(request, 'input.html')

def inscribing_api_view(request):
    if request.method == "GET":
        dataType = request.GET.get('dataType')
        shape = request.GET.get('shapeType')
        canvasLength = int(request.GET.get('length'))
        canvasWidth = int(request.GET.get('width'))
        circleRadius = int(request.GET.get('circleRadius',''))
        # sideLength = int(request.GET.get('squareSideLength',''))
        gpsDeviceCenters = request.GET.get('gpsDeviceCenters','')
        
        if shape == 'circles':
            output = json.loads(circle_inscribing_api(length = canvasLength, width = canvasWidth, radius = circleRadius))
            print(output)
            print(type(output))
        
        data = {'shape':shape,
                'dataType':dataType,
                'canvasLength':canvasLength,
                'canvasWidth':canvasWidth,
                'circleRadius':circleRadius,
                # 'sideLength':sideLength,
                'output':output}
        print(data)
        
        return render(request,'inscribe.html',data)
    
