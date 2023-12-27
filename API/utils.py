import numpy as np
import pandas as pd
import itertools
import math

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


def generate_ordered_pairs(list1,list2):
    #preparing the dataframe of the coordinates
    df = pd.DataFrame(columns=list1,index=list2)
    df.replace(to_replace=np.NaN,value="",inplace=True)
    # df1 = df.copy() #changes in df1 will not effect in df

    #placing the values as (x,y) coordinates
    for i in list2:
        for j in list1:
            df.at[i,j]=[i,j]

    return df

def get_count(dataframe):
    arr = dataframe.to_numpy()
    list1 = arr.tolist()

    dd=[]
    for i in range(len(list1)):
        dd.append(list(filter(lambda a: a != '', list1[i])))

    flattened_list = list(itertools.chain.from_iterable(dd))
    final_num = len(flattened_list)

    return final_num

def points_on_circle(center_x, center_y, radius, num_points):
    points = []
    for i in range(num_points):
        theta = 2 * math.pi * i / num_points
        x = center_x + radius * math.cos(theta)
        y = center_y + radius * math.sin(theta)
        points.append((x, y))
    return points
