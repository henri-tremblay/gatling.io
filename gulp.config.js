'use strict';

module.exports = function () {

  var build = {};
  build.root = 'build/';
  build.fonts = build.root + 'fonts/';
  build.images = build.root + 'images/';
  build.locales = build.root + 'locales/';
  build.scripts = build.root + 'scripts/';
  build.styles = build.root + 'styles/';

  var dist = 'dist/';

  var tmp = {};
  tmp.root = '.tmp/';
  tmp.scripts = tmp.root + 'scripts/';
  tmp.styles = tmp.root + 'styles/';

  var libs = 'libs/';

  var src = {};
  src.root = 'src/';
  src.app = src.root + 'app/';
  src.scss = src.app + 'scss/';

  build.conf = src.app + 'build.js';

  var config = {

    build: build,
    dist: dist,
    src: src,
    tmp: tmp,

    // Aggregated files paths

    html: {
      all: src.root + '**/*.html',
      index: src.root + 'index.html',
      templates: src.app + '**/*.html'
    },
    scripts: {
      all: src.app + '**/*.js',
      allFromRoot: [
        '*.js',
        src.root + '**/*.js'
      ],
      allFromSrc: src.root + '**/*.js',
      analytics: src.app + 'analytics.js',
      app: tmp.scripts + 'app.js',
      config: 'config.js',
      configSample: src.app + 'core/components/config.sample.js',
      main: src.app + 'main.js',
      tmpMain: tmp.root + 'app/main.js'
    },
    styles: {
      all: src.scss + '**/*.scss',
      css: {
        app: tmp.styles + 'app.css',
        vendor: tmp.styles + 'vendor.css'
      },
      scss: {
        app: src.scss + 'app.scss',
        vendor: src.scss + 'vendor.scss'
      }
    },

    // Files paths

    fonts: [
      libs + 'bootstrap-sass/assets/fonts/bootstrap/**/*.*',
      libs + 'font-awesome/fonts/**/*.*'
    ],
    images: src.app + 'images/**/*.*',
    locales: src.app + 'locales/**/*.*',

    // Bower and NPM locations

    bower: {
      json: require('./bower.json'),
      directory: libs
    },

    // Optimized scripts

    optimized: {
      app: 'app.js',
      vendor: 'vendor.js'
    },

    // Packages files

    packages: [
      './package.json',
      './bower.json'
    ],

    // AngularJS specifics

    templateCache: {
      file: 'templates.js',
      options: {
        module: 'io.gatling.core.templates',
        standAlone: false,
        root: 'app/'
      }
    }
  };

  config.getBrowserSyncDefaultOptions = function (devMode, debug) {
    var options = {
      ghostMode: {
        clicks: true,
        forms: true,
        locations: false,
        scroll: true
      },
      injectChanges: true, // false: always reload
      logFileChanges: true,
      notify: true,
      port: 3000,
      reloadDelay: 1000
    };

    if (devMode) {
      options.files = [
        config.src.root + '**/*.*',
        '!' + config.styles.all
      ];
      options.server = {
        baseDir: config.src.root,
        routes: {
          '/libs': 'libs',
          '/.tmp': '.tmp'
        }
      };
    } else {
      options.files = [];
      options.server = {
        baseDir: config.build.root
      };
    }

    if (debug) {
      options.logLevel = 'debug';
      options.logPrefix = 'gatling.io';
    }

    return options;
  };

  config.getWiredepDefaultOptions = function () {

    return {
      bowerJson: config.bower.json,
      directory: config.bower.directory
    };
  };

  return config;
};
