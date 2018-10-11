const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const server = require('gulp-webserver');
const webpack = require('webpack-stream');
const config = require('./config');
const gulpWatch = require('gulp-watch');
const del = require('del');
const {
    sass_config,
    gulp_server,
    webpack_config
} = config;
gulp.task('copy:html', function () {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('dest'))
    console.log('copy:html----finish！！！！')
})

gulp.task('refresh:css', function () {
    gulp.src('src/sass/*.scss')
        .pipe(gulpSass(sass_config).on('error', gulpSass.logError))
        .pipe(gulp.dest('dest/css'))
        .pipe(gulp.dest('src/css'))
    console.log('refresh:css----finish！！！！')
})

gulp.task('refresh:static',function(){
    gulp.src('./src/static/**/*')
        .pipe(gulp.dest('./dest/static'))
})

gulp.task('refresh:js', function () {
    gulp.src('src/javascript/**/*.js')
        .pipe(webpack(webpack_config))
        .pipe(gulp.dest('dest/javascript'))
})


gulp.task('reload-server',function(){
    gulp.src('./dest')//开启服务器，服务器的根目录就是/dest也就是localhost：8080
        .pipe(server(gulp_server))
})

gulp.task('watch', function () {
    gulp.watch('src/mypage/*.html', ['copy:html']);
    gulp.watch('src/sass/*.scss', ['refresh:css']);
    gulp.watch('src/javascript/**/*', ['refresh:js']);
    // gulp.watch('src/javascript/**/*', ['refresh:js']);
    gulpWatch('src/static',function(v){
        if(v.event==='unlink'){
            let _path = v.history[0].replace('\src','\dest'); 
            del(_path);
        }else{
            gulp.start(['refresh:static']);
            console.log(v.history,3333);
        }
    })
})


gulp.task('default', ['watch','reload-server'], function(){
    console.log('所有任务都加载完成')
})