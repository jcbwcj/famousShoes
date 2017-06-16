var gulp = require('gulp');

var sass = require('gulp-sass');

gulp.task('compileSass',function(){
	gulp.src('src/sass/*.scss')

	.pipe(sass({outputStyle:'expended'}))

	.pipe(gulp.dest('src/css/'));
});

gulp.task('jtSass',function(){
	gulp.watch('./src/sass/*.scss',['compileSass'])
});

var browserSync = require('browser-Sync');

gulp.task('ser',function(){
	browserSync({
		server:'./src/',

		files:['./src/**/*.html','./src/css/*.css','./src/js/*.js']
	});

	gulp.watch('./src/sass/*.scss',['compileSass'])
});



// 合并js文件
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
gulp.task('buildJs',function(){
	// 匹配js文件
	gulp.src('./src/js/*.js')

	// 合并成单个文件
	.pipe(concat('all.js'))

	// 输出
	.pipe(gulp.dest('./dist/js'))

	// 压缩
	.pipe(uglify({mangle:false}))

	// 改名
	.pipe(rename({suffix:'.min'}))

	.pipe(gulp.dest('dist/js/'))
});