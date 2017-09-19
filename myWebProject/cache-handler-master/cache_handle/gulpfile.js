/**
 ├── webapp/
 │   ├── css/
 │   │   ├── *.css
 │   │   ├── xx
 │   │    │    ├── *.css
 │   │   └── fonts
 │   │        ├── *.svg
 │   ├── js/
 │   │   ├── *.js
 │   │   └── xx
 │   │        ├── *.js
 │   ├── img/
 │   │   ├── *.jpg
 │   │   └── xx
 │   │        ├── *.jpg
 │   ├── page/
 │   │   ├── html
 │   │   └── ftl
 │   │        ├── *.ftl
 *
 *文件路径配置
 *src: webapp目录，绝对路径，需要自行配置
 *page: 页面根目录，相对路径，需要自行配置
 *resource：静态资源，相对路径，需要自行配置
 *html：页面文件，相对路径，需要自行配置
 *rev：rev-manifest.json文件所在目录，无需修改
 *app：静态资源临时目录，无需修改
 */
var config = {
    src: 'E:/workspace/acemeRepository/myWebProject/myWebSite/',
    oriPath: 'indexOri/',
    changedPath: '',
    resource: '**/*.{js,css,png,jpg,jpeg,gif,bmp,ico,eot,svg,ttf,woff}',
    html: '*.{html,ftl,jsp}',
    rev: './rev/',
    app: './app/'
};
var gulp = require('gulp');
var clean = require('gulp-clean'); //清除文件
var rev = require('gulp-rev'); //对文件名加MD5后缀
var revCollector = require('gulp-rev-collector'); //路径替换
var gulpSequence = require('gulp-sequence');	//任务串行
var minifyHTML = require('gulp-minify-html'); //代码压缩
//清除临时文件
gulp.task('clean',
    function () {
        return gulp.src([config.app], {
            read: false
        }).pipe(clean());
    });
//MD5后缀
gulp.task('rev',
    function () {
        return gulp.src([config.src + config.resource]) //需要处理的文件，放到一个字符串数组里
                    .pipe(rev()) //文件名加MD5后缀
                    .pipe(gulp.dest(config.app)) //输出静态资源
                    .pipe(rev.manifest()) //生成一个rev-manifest.json
                    .pipe(gulp.dest(config.rev)); //将 rev-manifest.json 保存到rev目录
    });
//替换引用
gulp.task('revCollector',
    function () {
        return gulp.src([config.rev + '*.json', config.src + config.oriPath + config.html])
                    //读取 rev-manifest.json 文件以及需要进行文件名替换的文件
                    .pipe(revCollector({
                        replaceReved: true,
                        // dirReplacements: {
                        //     'css': '',
                        //     'js': '',
                        //     'image': ''
                        // }, -- 没用
                        revSuffix: '\\?v=[0-9a-f]{8,10}$'
                    }))
                    //执行文件内引用名的替换
                    .pipe(gulp.dest(config.src + config.changedPath)); //替换后的文件输出的目录
    });
// 压缩代码
// gulp.task('minify', function () {
//     return gulp.src([config.src + config.resource, config.src + config.html]).pipe(minifyHTML({
//         empty: true, spare: true
//     })).pipe(gulp.dest(config.rev)); //将 压缩后的代码 保存到rev目录
// }); -- 有注释导致压缩后的代码有问题
//任务序列
gulp.task('default', gulpSequence('clean', 'rev', 'revCollector', 'minify'));
