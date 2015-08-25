var gulp      = require('gulp'),
    path = require('path'),
    rename    = require('gulp-rename'),
    stylus    = require('gulp-stylus'),
    minifyCss = require('gulp-minify'),
    uglify    = require('gulp-uglify'),
    plumber    = require('gulp-plumber'),
    concat    = require('gulp-concat');

var cfg = {
    bowerDir: './vendor/bower_components/',
    cssDir: './source/_styl/',
    jsDir: './source/_js/',
    assetsDir: './output_dev/assets/',
    stylusPattern: '**/*.styl',
    jsPattern: '**/*.js'
};

gulp.task('styles', function()
{
   return gulp.src(cfg.assetsDir + '_styl/styles.styl')
       .pipe(plumber())
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
        .pipe(plumber())
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(cfg.assetsDir));
});

gulp.task('watch', function()
{
    gulp.watch(cfg.cssDir + cfg.stylusPattern, ['styles']);
    gulp.watch(cfg.jsDir + cfg.jsPattern, ['scripts']);
});

gulp.task('default', ['styles', 'scripts']);
