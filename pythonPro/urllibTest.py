# -*- coding: UTF-8 -*-
import urllib
import re


def getHtml(url):
    page = urllib.urlopen(url)
    html = page.read()
    return html


def getImg(html):
    reg = r'src="(http.+?\.jpg)"'
    imgre = re.compile(reg)
    imglist = re.findall(imgre, html)
    n = 0
    for imgurl in imglist:
        urllib.urlretrieve(imgurl, 'tempImgs/%s.jpg' % n)
        n += 1
    return imglist


ht = getHtml("http://tieba.baidu.com/p/5004440579")
li = getImg(ht)
for i in li:
    print i
