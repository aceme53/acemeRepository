# -*- coding: utf-8 -*-
import cv2
import numpy as np

img = cv2.imread("aceme.jpg")
imgGrey = cv2.imread("aceme.jpg", 0)
emptyImage = np.zeros(img.shape, np.uint8)
print(img.shape, imgGrey.shape, emptyImage.shape)
newImg = cv2.resize(img, (200, 200))
newImg = cv2.copyMakeBorder(newImg, 10, 10, 10, 10, cv2.BORDER_CONSTANT, value=(201, 124, 1))

cv2.imshow("newWin", newImg)

# cv2.IMWRITE_JPEG_QUALITY指定jpg质量，范围0到100，默认95，越高画质越好，文件越大
# cv2.imwrite('test_imwrite.jpg', color_img, (cv2.IMWRITE_JPEG_QUALITY, 80))
# cv2.IMWRITE_PNG_COMPRESSION指定png质量，范围0到9，默认3，越高文件越小，画质越差
# cv2.imwrite('test_imwrite.png', color_img, (cv2.IMWRITE_PNG_COMPRESSION, 5))

if cv2.waitKey(0) == 27:
    print('esc')
    cv2.destroyAllWindows()
elif cv2.waitKey(0) == ord('s'):
    print('save')
    cv2.imwrite('./newImg/saveNew.jpg', img, [int(cv2.IMWRITE_JPEG_QUALITY), 100])
    cv2.destroyAllWindows()
else:
    print('else')


