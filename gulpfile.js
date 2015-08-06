var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('jshint', function(){
    return gulp.src([
        '/public/javascripts/*.js',
        '/routes/*.js',
        '/*.js'
    ]);
});

gulp.task('openMongoDB', shell.task([
        './mongodb/bin/mongod --dbpath /data/db'
    ])
);