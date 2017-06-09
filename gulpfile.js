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

		files:['./src/*.html','./src/css/*.css','./src/js/*.js']
	});

	gulp.watch('./src/sass/*.scss',['compileSass'])
});