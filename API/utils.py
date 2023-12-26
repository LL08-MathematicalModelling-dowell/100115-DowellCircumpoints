import numpy as np
import pandas as pd
import itertools


def generate_coordinates(start,limit,step):
    y = []
    x = []
    iterations = int(10*limit)
    i = 0
    count = start


    for i in range(iterations):
        y.append(round(count,3))
        if i>0:
            x.append(round(-count,3))
        if i != iterations:
            count += step
        i += 1
        if count>(limit/2):
            break

    list1 =  list(reversed(x))
    list1.extend(y)
    x_num = len(list1)
    print(list1)
    print("Total no. of X-coordinates: ",x_num)

    # For Ycoordinates
    list2 = list(reversed(y))
    list2.extend(x)
    y_num = len(list2)
    print(list2)
    print("Total no. of Y-coordinates: ",y_num)

    return list1,list2

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
