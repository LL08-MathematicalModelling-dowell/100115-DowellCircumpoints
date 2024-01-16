import numpy as np
import pandas as pd
import itertools
import math
import json
import requests


#event creation api
def get_event_id():
    url = "https://uxlivinglab.pythonanywhere.com/create_event"
    # url = "https://100003.pythonanywhere.com/create_event"
    data = {
        "platformcode": "FB",
        "citycode": "101",
        "daycode": "0",
        "dbcode": "pfm",
        "ip_address": "192.168.0.41",  # get from dowell track my ip function
        "login_id": "lav",  # get from login function
        "session_id": "new",  # get from login function
        "processcode": "1",
        "location": "22446576",  # get from dowell track my ip function
        "objectcode": "1",
        "instancecode": "100051",
        "context": "afdafa ",
        "document_id": "3004",
        "rules": "some rules",
        "status": "work",
        "data_type": "learn",
        "purpose_of_usage": "add",
        "colour": "color value",
        "hashtags": "hash tag alue",
        "mentions": "mentions value",
        "emojis": "emojis",
        "bookmarks": "a book marks",
    }
    r = requests.post(url, json=data)
    if r.status_code == 201:
        return json.loads(r.text)
    else:
        return json.loads(r.text)["error"]


# get the array of coordinates for an axis
def generate_coordinates(start, limit, step):
    y = np.array([], dtype=float)
    x = np.array([], dtype=float)
    count = start
    iterations = int(10 * limit)

    for i in range(iterations):
        y = np.append(y, round(count, 3))
        if i > 0:
            x = np.append(x, round(-count, 3))
        if i != iterations - 1:
            count += step
        if count > limit / 2:
            break
    return x, y

#  generate ordered pairs of the coordinates
def generate_ordered_pairs(list1,list2):
    #preparing the dataframe of the coordinates
    df = pd.DataFrame(columns=list1,index=list2)
    df.replace(to_replace=np.NaN,value="",inplace=True)

    #placing the values as (x,y) coordinates
    for i in list2:
        for j in list1:
            df.at[i,j]=[i,j]

    return df

# calculate the total no of squares
def get_count(dataframe):
    arr = dataframe.to_numpy()
    list1 = arr.tolist()

    dd=[]
    for i in range(len(list1)):
        dd.append(list(filter(lambda a: a != '', list1[i])))

    flattened_list = list(itertools.chain.from_iterable(dd))
    final_num = len(flattened_list)

    return final_num

# Inscribing square fucntion
def inscribing_squares(length, width, side):
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
    cartesian_coords = arr.tolist()

    return count, df, cartesian_coords


# calculate the coordinates of points on the circumference of a circle
def points_on_circle(center_x, center_y, radius, num_points):
    points = []
    for i in range(num_points):
        theta = 2 * math.pi * i / num_points
        x = center_x + radius * math.cos(theta)
        y = center_y + radius * math.sin(theta)
        points.append((x, y))
    return points

# calculate points on circumference of multiple circles
def points_on_circles_dict(center_coordinates, radius, num_points):
    all_points_dict = {}
    
    for center in center_coordinates:
        center_x, center_y = center
        points = points_on_circle(center_x, center_y, radius, num_points)
        all_points_dict[str(center)] = points
    
    return all_points_dict

# calculate points of intersection for multiple circles
def find_intersection_points(center_coordinates, radius, num_points):
    intersection_points = []

    for i in range(len(center_coordinates)):
        for j in range(i + 1, len(center_coordinates)):
            center1_x, center1_y = center_coordinates[i]
#             print(center1_x, center1_y)
            center2_x, center2_y = center_coordinates[j]

            # Check if circles intersect
            distance_between_centers = math.sqrt((center2_x - center1_x)**2 + (center2_y - center1_y)**2)
#             print(distance_between_centers)
            if distance_between_centers < 2 * radius:
                # Circles intersect, find intersection points
                points_list1 = points_on_circle(center1_x, center1_y, radius, num_points)
                points_list2 = points_on_circle(center2_x, center2_y, radius, num_points)
                
                # Find common points
                common_points = set(points_list1).intersection(points_list2)
                
                intersection_points.extend(common_points)

    return intersection_points


# cartesian to lat long conversion
def convert_coordinates_df(df):
    def convert_coordinates(coords):
        if isinstance(coords, list) and len(coords) == 2:
            x, y = coords
            lat = "{:.10f}".format(y * 0.000008987)
            lon = "{:.10f}".format(x * 0.000008987)
            return [float(lat), float(lon)]
        else:
            return coords

    # Apply conversion function to each cell in the DataFrame
    converted_df = df.applymap(convert_coordinates)
    return converted_df