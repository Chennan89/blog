var gulp=require ('gulp');
var uglify=require ('gulp-uglify');
var concat=require ('gulp-concat');
var babel = require("gulp-babel"); 
var gutil = require("gutil"); 
 //var md5 = require("gulp-md5-plus");
 

/*gulp.task('default', ['app', 'router'],()=>{
    gulp.watch(['app.js','./routers/indexRouter.js'],['app','router']);
});//监控app.js变化，只要变化就执行app和router俩任务*/

gulp.task('app',function(){//gulp app
    gulp.src('./app.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dest/'))
});

gulp.task('router',function(){
    gulp.src(['./controllers/*'])
    .pipe(babel())
    .pipe(uglify().on('error', function(err){
            gutil.log(err);
            this.emit('end');}))
    //.pipe(jshint())  
    //.pipe(jshint.reporter()) // 输出检查结果
     //.pipe(concat('index.js'))
    //.on('error', function (err){console.log(err)})
    .pipe(gulp.dest('./dest/controllers'))
});

gulp.task('model',function(){
    gulp.src(['./models/*',])
    .pipe(babel())
    .pipe(uglify().on('error', function(err){
            gutil.log(err);
            this.emit('end');}))
    //.pipe(jshint())  
    //.pipe(jshint.reporter()) // 输出检查结果
     //.pipe(concat('index.js'))
    //.on('error', function (err){console.log(err)})
    .pipe(gulp.dest('./dest/models'))
});


gulp.task('default', ['app', 'router','model']);
//gulp.task('default', ['app']);