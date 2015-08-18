var gulp = require('gulp');
var shell = require('gulp-shell');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

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

gulp.task('scripts' , function() {
    //gulp.src(['public/javascripts/app.js', 'public/javascripts/lib/socket.io-client/socket.io.js'])
    gulp.src('public/javascripts/app.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./lib'))
});

/*gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('src/js/app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build/js'))
});*/
