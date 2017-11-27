# coding=utf-8
# http://blog.csdn.net/garfielder007/article/details/51317266
import cv2.cv as cv
import random

######################################################
################### 运算处理 #########################
######################################################
# 这里也可以使用 Get2D/Set2D 来加载图片
im = cv.LoadImage("testImg.jpg")

for k in range(5000):  # Create 5000 noisy pixels
    i = random.randint(0, im.height - 1)
    j = random.randint(0, im.width - 1)
    color = (random.randrange(256), random.randrange(256), random.randrange(256))
    im[i, j] = color

cv.ShowImage("Noize", im)
cv.WaitKey(0)

######################################################
################### 滤镜效果 #########################
######################################################
image = cv.LoadImage('testImg.jpg', cv.CV_LOAD_IMAGE_COLOR)  # Load the image
cv.ShowImage("Original", image)

grey = cv.CreateImage((image.width, image.height), 8, 1)  # 8depth, 1 channel so grayscale
cv.CvtColor(image, grey, cv.CV_RGBA2GRAY)  # Convert to gray so act as a filter
cv.ShowImage('Greyed', grey)

# 平滑变换
smoothed = cv.CloneImage(image)
cv.Smooth(image, smoothed, cv.CV_MEDIAN)  # Apply a smooth alogrithm with the specified algorithm cv.MEDIAN
cv.ShowImage("Smoothed", smoothed)

# 均衡处理
cv.EqualizeHist(grey, grey)  # Work only on grayscaled pictures
cv.ShowImage('Equalized', grey)

# 二值化处理
threshold1 = cv.CloneImage(grey)
cv.Threshold(threshold1, threshold1, 100, 255, cv.CV_THRESH_BINARY)
cv.ShowImage("Threshold", threshold1)

threshold2 = cv.CloneImage(grey)
cv.Threshold(threshold2, threshold2, 100, 255, cv.CV_THRESH_OTSU)
cv.ShowImage("Threshold 2", threshold2)

element_shape = cv.CV_SHAPE_RECT
pos = 3
element = cv.CreateStructuringElementEx(pos * 2 + 1, pos * 2 + 1, pos, pos, element_shape)
cv.Dilate(grey, grey, element, 2)  # Replace a pixel value with the maximum value of neighboors
# There is others like Erode which replace take the lowest value of the neighborhood
# Note: The Structuring element is optionnal
cv.ShowImage("Dilated", grey)

cv.WaitKey(0)

######################################################
################### 滑动控件 #########################
######################################################
im = cv.LoadImage('testImg.jpg', cv.CV_LOAD_IMAGE_GRAYSCALE)
thresholded = cv.CreateImage(cv.GetSize(im), 8, 1)


def onChange(val):
    cv.Threshold(im, thresholded, val, 255, cv.CV_THRESH_BINARY)
    cv.ShowImage("trackBarImage", thresholded)


# 创建一个滑动条控件
onChange(100)  # Call here otherwise at startup. Show nothing until we move the trackbar
cv.CreateTrackbar("Thresh", "trackBarImage", 100, 255, onChange)  # Threshold value arbitrarily set to 100

cv.WaitKey(0)

######################################################
################### 选区操作 #########################
######################################################
im = cv.LoadImage("testImg.jpg", 3)

# 选择一块区域
cv.SetImageROI(im, (100, 100, 200, 200))  # Give the rectangle coordinate of the selected area

# 变换操作
cv.Zero(im)
cv.Set(im, cv.RGB(255, 0, 0))

# 解除选区
cv.ResetImageROI(im)  # Reset the ROI

cv.ShowImage("chooseImage", im)

cv.WaitKey(0)
