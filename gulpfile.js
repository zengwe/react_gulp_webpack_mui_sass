var gulp = require('gulp'); 
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');
var livereload = require('gulp-livereload');
var header = require('gulp-header');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var react = require("gulp-react");
var webpack = require("gulp-webpack");
var myinfo="/*\n*@author zengw\n*@contect 584778883@qq.com\n*@time "+new Date()+"\n*/\n";
//gulp-header
        // .pipe(assets)
        // .pipe(gulpif('*.js', uglify()))
        // .pipe(gulpif('*.css', minifyCss()))
        // .pipe(assets.restore())
        // .pipe(useref())
        // .pipe(gulp.dest('www'));
gulp.task('sass', function() {
    gulp.src('./sass/*.scss')
        .pipe(sass())
        .on('error', function(err) {
            gutil.log('scss Error!', err.message);
            this.end();
        })
        .pipe(header(myinfo))
        .pipe(gulp.dest('./css'));
});
gulp.task('js', function() {
    gulp.src(['./jstemp/*.js'])
        .pipe(header(myinfo))
        //.pipe(react())
        //.pipe(babel({presets: ['es2015']}))
        //.pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./js'));
});
gulp.task("jsx",function(){
    gulp.src("./jstemp/*.jsx")
        // .pipe(react())
        // .pipe(babel({presets: ['es2015']}))
        .pipe(header(myinfo))
        .pipe(webpack({
            entry:{
                home_x:__dirname+"/jstemp/home_x.jsx",
                fiter_top:__dirname+"/jstemp/fiter_top.jsx",
                filter_area_top:__dirname+"/jstemp/filter_area_top.jsx",
                filter_time_top:__dirname+"/jstemp/filter_time_top.jsx",
                filter_type_top:__dirname+"/jstemp/filter_type_top.jsx",
                dynamic_state:__dirname+"/jstemp/dynamic_state.jsx"
            },
            output:{
                filename:'[name].jsx'
            },
            module:{
                loaders: [
                  {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel',
                    query: {
                      presets: ['react', 'es2015']
                    }
                  }
                ]
            }                                
        }))
        .pipe(gulp.dest('./js'));
});
gulp.task('html', function() {
    gulp.src('./view_temp/*.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('./view'));
});
gulp.task("reload",function(event){
    livereload.listen();  
});
gulp.task('default', function(){
    gulp.run('sass',"js","html","reload","jsx");
    // 监听文件变化
    gulp.watch(['./sass/*.scss','./sass/temp/*.scss'], function(data){
        gulp.run('sass');
    });
    gulp.watch(['./jstemp/*.js'], function(data){
        gulp.run('js');
    });
    gulp.watch(['./jstemp/*.jsx','./jstemp/modules/*.jsx'], function(data){
        gulp.run('jsx');
    });    
    gulp.watch(['./view_temp/*.html','./view_temp/common/*.html'], function(data){
        gulp.run('html');
    });
    gulp.watch("./package.json",function(){
        gulp.run('sass',"js","html");
    });
    gulp.watch(["./view/*.html","./css/*.css"],function(event){
        livereload.changed(event.path);
    });        
});
/*
powercmd
用户名：nzone

注册码：PCMDA-86128-PCMDA-70594

http://www.baidu.com/*/


