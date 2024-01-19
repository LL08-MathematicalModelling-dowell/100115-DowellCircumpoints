import requests
import json

def circle_inscribing_api(length,width,radius):
    url = "http://100071.pythonanywhere.com/processapi/"
    payload = {
                "length": length,
                "width":width,
                "radius":radius
            }
    data = requests.post(url, json = payload)
    if data.status_code == 200:
        return data.text
    else:
        return json.loads(data.text)["error"]