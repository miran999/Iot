from cv2 import imshow
import numpy as np
import cv2
import urllib
from flask import Flask, request, Response
from lane import *

url ='http://172.28.130.209:8080/shot.jpg'
while True:
    img=urllib.request.urlopen(url)
    im=np.array(bytearray(img.read()),dtype=np.uint8)
    img0=cv2.imdecode(im,-1)
    #cv2.imshow('hh', img0)
    #  cv2.waitKey(0)
    #cv2.destroyAllWindows()
    #  Filename
    filename = 'Output.jpg'
    for n in range(1):
        cv2.imwrite(filename, img0)
        frame = cv2.imread(filename)
        edges = detect_edges(frame)
        cropped_edges = region_of_interest(edges)
        line_segments = detect_line_segments(cropped_edges)
        lane_lines = average_slope_intercept(frame, line_segments)
        lane_lines_image = display_lines(frame, lane_lines)
        cv2.imshow("lane lines", lane_lines_image)
        cv2.waitKey(0)










# Using cv2.imwrite() method
# Saving the image
# cv2.imwrite(filename, img0)
# filepath = 'C:\Users\moham\Desktop\IOT\Server'
# onlyfiles = [f for f in listdir(filepath) if isfile(join(filepath))]
 
    # other things you need to do snipped
    # cv2.imwrite(f'C:\Users\moham\Desktop\IOT\Server/image_{n}.png', img0)


#  im1 = Image.open(r"http://10.10.10.74:8080/shot.jpg") 
# # save a image using extension
#  image = im1.save("webcam.jpg")

