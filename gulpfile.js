const gulp = require('gulp');
// 压缩css文件
const cssmin = require('gulp-clean-css');
// 压缩html，可以压缩页面javascript、css，去除页面空格、注释，删除多余属性等操作
const htmlmin = require('gulp-htmlmin');
// 只操作有过修改的文件
const changed = require('gulp-changed');
// 压缩javascript文件，减小文件大小
const uglify = require('gulp-uglify');
// 文件清理
const clean = require('gulp-clean');
// es6转es5
const babel = require('gulp-babel');
// 加版本号
const assetRev = require('gulp-asset-rev');

// 使用gulp-htmlmin压缩html
gulp.task('htmlminTask', function () {
    var options = {
        removeComments: true, // 清除HTML注释
        collapseWhitespace: true, // 压缩HTML
        collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
        minifyJS: true, // 压缩页面JS
        minifyCSS: true // 压缩页面CSS
    };
    gulp.src('src/index.html')
        .pipe(changed('dist'))
        .pipe(assetRev())  
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'))
    gulp.src('src/html/*.html') 
        .pipe(changed('dist'))
        .pipe(assetRev()) 
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'))
})
// 使用gulp-clean-css压缩css文件
gulp.task('cssminTask', function() {
    var option = {
        advanced: true,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
        compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
        keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
        keepSpecialComments: '*'//保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
    }
    gulp.src('src/style/*.css')
        .pipe(assetRev()) 
        .pipe(cssmin(option)) // 压缩css 
        .pipe(gulp.dest('dist/style/')) // 将会在dist/css下生成index.css
})
// 使用gulp-uglify压缩javascript文件，减小文件大小。
gulp.task('uglifyTask', function () {
    gulp.src(['src/js/*.js'])
        .pipe(assetRev()) 
        .pipe(changed('dist/js')) // 对应匹配的文件
        .pipe(babel({
            presets: ['es2015'] // es5检查机制
        }))
        // .pipe(uglify()) // 使用uglify进行压缩，并保留部分注释 
        .pipe(gulp.dest('dist/js/'));
});
// 文件复制
gulp.task('copyTask', function () {
    gulp.src('src/favicon.ico')
        .pipe(gulp.dest('dist/'))
    gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img/'))
    gulp.src('src/img/about_us/*')
        .pipe(gulp.dest('dist/img/about_us'))
    gulp.src('src/img/active-img/*')
        .pipe(gulp.dest('dist/img/active-img'))
    gulp.src('src/img/footer/*')
        .pipe(gulp.dest('dist/img/footer'))
    gulp.src('src/img/index/*')
        .pipe(gulp.dest('dist/img/index'))
    gulp.src('src/img/zhaopin_img/*')
        .pipe(gulp.dest('dist/img/zhaopin_img'))
    gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
})

// 清理文件
gulp.task('cleanTask', function() {
    var stream = gulp.src( 'dist', {read: false} ) // 清理maps文件
        .pipe(clean())
    return stream
})
// 打包
gulp.task('dev',['cleanTask','htmlminTask', 'copyTask', 'cssminTask','uglifyTask'])
