CLS
@ECHO off
ECHO ---------------------------------------------
ECHO 1. ��װnode.js�����ް�װ·��
ECHO ---------------------------------------------
node-v5.7.0-x64.msi
ECHO ---------------------------------------------
ECHO 2. ��װgulp���߼������Լ3���ӣ��뱣�����糩ͨ
ECHO ---------------------------------------------
call npm install --global gulp
call npm install gulp gulp-clean gulp-minify-html gulp-rev gulp-rev-collector gulp-sequence --save-dev
ECHO ---------------------------------------------
ECHO Finish
ECHO ---------------------------------------------
pause