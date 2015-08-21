var gulp      = require('gulp'),
    path = require('path'),
    rename    = require('gulp-rename'),
    stylus    = require('gulp-stylus'),
    minifyCss = require('gulp-minify'),
    uglify    = require('gulp-uglify');

var cfg = {
    bowerDir: './vendor/bower_components/',
    assetsDir: './source/assets/',
    stylusPattern: 'styl/*',
    jsPattern: 'js/**/*.js'
};

gulp.task('styles', function()
{
   return gulp.src(cfg.assetsDir + 'styl/styles.styl')
       .pipe(stylus({
           compress: true,
           linenos: true,
           use: [require('nib')()],
           import: [
               'nib',
               path.join(__dirname, cfg.bowerDir, '/colette/styl/colette.styl')
           ]
       }))
       .pipe(minifyCss())
       .pipe(gulp.dest(cfg.assetsDir));
});

gulp.task('scripts', function()
{
    return gulp.src(cfg.bowerDir + 'colette/js/colette.js')
        .pipe(rename(function(path){
            path.basename = path.basename.replace('.js', '.min.js');
        }))
        .pipe(uglify())
        .pipe(gulp.dest(cfg.assetsDir));
});

gulp.task('watch', function()
{
    gulp.watch(cfg.assetsDir + cfg.stylusPattern, ['styles']);
    gulp.watch(cfg.assetsDir + cfg.jsPattern, ['scripts']);
});

gulp.task('default', ['styles', 'scripts']);
