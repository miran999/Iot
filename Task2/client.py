from __future__ import print_function
from tkinter import Frame
import requests
import json
import cv2
import numpy as np
import logging
import math
import datetime
import sys
import matplotlib.pyplot as plt
import matplotlib.image as img


addr = 'http://172.28.130.236:5000'
test_url = addr + '/api/test'

# prepare headers for http request
content_type = 'image/jpeg'
headers = {'content-type': content_type}

frame = cv2.imread('green3.jpg')
# encode image as jpeg
_, img_encoded = cv2.imencode('.jpg', frame)
# send http request with image and receive response
response = requests.post(test_url, data=img_encoded.tostring(), headers=headers)
# decode response
print(json.loads(response.text))

# expected output: {u'message': u'image received. size=124x124'}
