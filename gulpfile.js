'use strict';

var gulp = require('gulp');

var args = require('yargs').argv;
var browserSync = require('browser-sync').create();
var chalk = require('chalk');
var config = require('./gulp.config')();
var del = require('del');
var fs = require('fs');
var requirejs = require('requirejs');
var wiredep = require('wiredep').stream;

var $ = require('gulp-load-plugins')({
  lazy: true
});

//// Helpers ///////////////////////////////////////////////////////////////////////////////////////////////////////////

function clean(path) {
  log('Cleaning: ' + path);

  return del(path);
}

function errorHandler(process) {

  return function (message) {
    $.util.log(chalk.white.bgRed.bold('[' + process + ']'), message.toString());

    this.emit('end');
  };
}

function log(message) {
  if (typeof(message) === 'object') {
    for (var item in message) {
      if (message.hasOwnProperty(item)) {
        $.util.log(chalk.black.bgCyan(message[item]));
      }
    }
  } else {
    $.util.log(chalk.black.bgCyan(message));
  }
}

//// Tasks /////////////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean', function () {

  return clean([
    config.build.root,
    config.dist,
    config.tmp.root
  ]);
});

// Fonts

gulp.task('copy:fonts', function () {
  log('Copying fonts');

  return gulp.src(config.fonts)
    .pipe(gulp.dest(config.build.fonts));
});

// Images

gulp.task('copy:images', function () {
  log('Copying and compressing images');

  return gulp.src(config.images)
    .pipe($.imagemin({optimization: 4}))
    .pipe(gulp.dest(config.build.images));
});

// Locales

gulp.task('copy:locales', function () {
  log('Copying locales translation files');

  return gulp.src(config.locales)
    .pipe(gulp.dest(config.build.locales));
});

// Scripts

gulp.task('vet', function () {
  log('Analyzing sources with JSHint and JSCS');

  return gulp.src(config.scripts.allFromRoot)
    .pipe($.jscs())
    .pipe($.jscs.reporter())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('clean:scripts', function () {

  return clean([
    config.tmp.scripts + '**/*.js',
    config.build.scripts + '**/*.js'
  ]);
});

gulp.task('cache:templates', function () {
  log('Creating AngularJS $templateCache');

  return gulp.src(config.html.templates)
    .pipe($.replace('app/images/', 'images/'))
    .pipe($.htmlmin({
      collapseWhitespace: true,
      minifyJS: true
    }))
    .pipe($.angularTemplatecache(
      config.templateCache.file,
      config.templateCache.options
    ))
    .pipe(gulp.dest(config.tmp.scripts));
});

gulp.task('scripts', gulp.series('clean:scripts', 'cache:templates'));

// Styles

gulp.task('clean:styles', function () {

  return clean([
    config.tmp.root.styles + '**/*.css',
    config.tmp.root.styles + '**/*.map'
  ]);
});

gulp.task('app:styles', function () {
  log('Compiling app SASS files to CSS');

  var appFilter = $.filter('app.css', {restore: true});

  return gulp.src(config.styles.scss.app)
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .on('error', errorHandler('Sass'))
    .pipe($.sourcemaps.write('.'))
    .pipe(appFilter)
    .pipe($.autoprefixer({browser: ['last 2 version', '> 5%']}))
    .on('error', errorHandler('Autoprefixer'))
    .pipe(appFilter.restore)
    .pipe(gulp.dest(config.tmp.styles))
    .pipe(browserSync.stream());
});

gulp.task('vendor:styles', function () {
  log('Compiling vendor SASS files to CSS');

  var wiredepOptions = config.getWiredepDefaultOptions();

  return gulp.src(config.styles.scss.vendor)
    .pipe(wiredep(wiredepOptions))
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .on('error', errorHandler('Sass'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.tmp.styles));
});

gulp.task('styles', gulp.series(
  'clean:styles',
  gulp.parallel('app:styles', 'vendor:styles')
));

// Injection

gulp.task('wiredep', function () {
  log('Wire up the app and vendor css into the html');

  var wiredepOptions = config.getWiredepDefaultOptions();

  return gulp.src(config.html.index)
    .pipe(wiredep(wiredepOptions))
    .pipe($.inject(gulp.src(config.scripts.main)))
    .pipe(gulp.dest(config.src.root));
});

gulp.task('inject:styles', function () {
  log('Finalize wiring up after calling wiredep');

  return gulp.src(config.html.index)
    .pipe($.inject(gulp.src(config.styles.css.app, {read: false}), {
      name: 'app',
      relative: true
    }))
    .pipe($.inject(gulp.src(config.styles.css.vendor, {read: false}), {
      name: 'vendor',
      relative: true
    }))
    .pipe(gulp.dest(config.src.root));
});

gulp.task('inject', gulp.series(
  gulp.parallel('wiredep', 'styles'),
  'inject:styles'
));

// Optimize

gulp.task('copy:scripts', function () {
  log('Copying scripts to help optimizing them with RequireJS');

  var constantsFilter = $.filter('**/constants.js', {restore: true});

  return gulp.src(config.scripts.allFromSrc)
    .pipe(constantsFilter)
    .pipe($.replace('app/', ''))
    .pipe(constantsFilter.restore)
    .pipe(gulp.dest(config.tmp.root));
});

gulp.task('inject:templates', function () {
  log('Injecting templates');

  return gulp.src(config.tmp.root + 'app/core/templates/all.js')
    .pipe($.inject(gulp.src(config.tmp.scripts + config.templateCache.file), {
      starttag: '// inject:templates:js',
      endtag: '// endinject',
      transform: function (path, file) {
        return file._contents.toString('utf8');
      }
    }))
    .pipe(gulp.dest(config.tmp.root + 'app/core/templates/'));
});

gulp.task('requirejs:optimize', function (done) {
  log('Optimizing the javascript files with RequireJS module');

  var options = {
    baseUrl: config.tmp.root + 'app/',
    findNestedDependencies: true,
    include: ['requireLib'],
    mainConfigFile: config.scripts.tmpMain,
    name: 'app',
    out: config.tmp.scripts + config.optimized.app,
    paths: {
      requireLib: '../../libs/requirejs/require',
      'config': 'empty:'
    },
    removeCombined: true
  };

  requirejs.optimize(options, function (response) {
    var lines = response.split('\n');
    for (var i = 0; i < lines.length; i++) {
      $.util.log(lines[i]);
    }

    done();
  });
});

gulp.task('prepare:scripts', gulp.series(
  gulp.parallel('inject', gulp.series('cache:templates', 'copy:scripts')),
  gulp.series('inject:templates', 'requirejs:optimize')
));

gulp.task('optimize:all', function () {
  log('Optimizing the javascript, css, and html');

  var assetsFilter = $.filter(['**/*.css', '**/*.js'], {restore: true});
  var cssAppFilter = $.filter('**/app.css', {restore: true});
  var cssVendorFilter = $.filter('**/vendor.css', {restore: true});
  var htmlFilter = $.filter('**/*.html', {restore: true});

  return gulp.src(config.html.index)
    .pipe($.plumber())
    .pipe($.inject(gulp.src(config.scripts.app, {read: false}), {
      name: 'app',
      relative: true
    }))
    .pipe($.useref())
    .pipe(cssAppFilter)
    .pipe($.replace('../../app/images/', '../images/'))
    .pipe($.csso())
    .pipe(cssAppFilter.restore)
    .pipe(cssVendorFilter)
    .pipe($.replace('../../libs/font-awesome/fonts/', '../fonts/'))
    .pipe($.replace('../../libs/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
    .pipe($.csso(true)) // Turning structural optimizations off for vendor file
    .pipe(cssVendorFilter.restore)
    .pipe(assetsFilter)
    .pipe($.rev())
    .pipe(assetsFilter.restore)
    .pipe($.revReplace({
      replaceInExtensions: ['.html']
    }))
    .pipe(htmlFilter)
    .pipe($.replace('app/images/', 'images/'))
    .pipe($.replace(/<!-- inline:analytics -->/, function () {
      var analytics = fs.readFileSync(config.scripts.analytics, 'utf8');
      return '<script>' + analytics + '</script>';
    }))
    .pipe($.replace(
      /<script src="(scripts\/app-[a-f0-9]+.js)"><\/script>/,
      '<script src="$1" data-main="bootstrap"></script>'
    ))
    .pipe($.replace(/<!-- .* -->/g, ''))
    .pipe($.replace(/\n[ \t\n]*/g, ''))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(config.build.root));
});

gulp.task('optimize', gulp.series('prepare:scripts', 'optimize:all'));

gulp.task('copy:sample-config-file', function () {
  log('Copying config file');

  return gulp.src(config.scripts.configSample)
    .pipe($.rename(config.scripts.config))
    .pipe(gulp.dest(config.build.root));
});

gulp.task('build', gulp.parallel(
  'copy:fonts',
  'copy:images',
  'copy:locales',
  'copy:sample-config-file',
  'optimize'
));

// Serve

function initBrowserSync(devMode) {
  if (browserSync.active) {
    log('Not launching browser-sync because is it already active');

    return;
  }

  log('Starting browser-sync on port 3000');

  if (devMode) {
    gulp.watch([
      config.styles.all
    ], gulp.series('app:styles'));
  } else {
    gulp.watch([
      config.styles.all,
      config.scripts.all,
      config.html.all
    ], gulp.series('optimize', browserSync.reload));
  }

  var options = config.getBrowserSyncDefaultOptions(devMode, args.debug);
  browserSync.init(options);
}

gulp.task('sync:dev', function () {
  initBrowserSync(true/* devMode */);
});

gulp.task('sync:build', function () {
  initBrowserSync(false/* devMode */);
});

gulp.task('serve', gulp.series('clean', 'inject', 'sync:dev'));
gulp.task('serve:build', gulp.series('clean', 'build', 'sync:build'));

// Package

gulp.task('archive', function () {
  var project = require('./package.json');
  log('Making archive for version ' + project.version);

  return gulp.src(config.build.root + '**/*.*')
    .pipe($.tar(project.name + '-' + project.version + '.tar'))
    .pipe($.gzip())
    .pipe(gulp.dest(config.dist));
});

gulp.task('package', gulp.series('clean', 'build', 'archive'));
