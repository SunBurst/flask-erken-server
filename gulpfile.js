var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var minifyHtml = require('gulp-minify-html');
var rev = require('gulp-rev');

gulp.task('clean', function (cb) {
    del([
        // everything inside the dist folder
        'app/dist/**/*'
    ], cb);
});

gulp.task('usemin', function () {
    return gulp.src('*.html')
        .pipe(usemin({
            html: [minifyHtml({empty: true, conditionals:true})],
            js: [uglify(), 'concat', rev()]
        }))
        .pipe(gulp.dest('app/dist'));
});

gulp.task('build', ['clean'], function () {
    gulp.run('usemin');
});
