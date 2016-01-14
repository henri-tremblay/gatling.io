'use strict';

require.config({

  //<script src='bower_components/angulartics/dist/angulartics-ga.min.js'></script>

  paths: {
    'angular': '../../libs/angular/angular',
    'angular-animate': '../../libs/angular-animate/angular-animate',
    'angular-bootstrap': '../../libs/angular-bootstrap/ui-bootstrap-tpls',
    'angular-cookies': '../../libs/angular-cookies/angular-cookies',
    'angular-sanitize': '../../libs/angular-sanitize/angular-sanitize',
    'angular-touch': '../../libs/angular-touch/angular-touch',
    'angular-translate': '../../libs/angular-translate/angular-translate',
    'angular-translate-loader-static-files': '../../libs/angular-translate-loader-static-files/angular-translate-loader-static-files',
    'angular-ui-router': '../../libs/angular-ui-router/release/angular-ui-router',

    'angulartics': '../../libs/angulartics/dist/angulartics.min',
    'angulartics-google-analytics': '../../libs/angulartics-google-analytics/lib/angulartics-google-analytics',
    'bootstrap-sass': '../../libs/bootstrap-sass/assets/javascripts/bootstrap',
    'hljs': '../../libs/highlightjs/highlight.pack',
    'jquery': '../../libs/jquery/dist/jquery',
    'leaflet': '../../libs/leaflet/dist/leaflet',
    'leaflet.markercluster': '../../libs/leaflet.markercluster/dist/leaflet.markercluster',
    'lodash': '../../libs/lodash/lodash',

    'domReady': '../../libs/requirejs-domready/domReady',

    'config': 'core/components/config'
  },

  shim: {
    'angular': {
      deps: ['bootstrap-sass', 'jquery', 'lodash'],
      exports: 'angular'
    },
    'angular-animate': ['angular'],
    'angular-bootstrap': ['angular'],
    'angular-cookies': ['angular'],
    'angular-sanitize': ['angular'],
    'angular-touch': ['angular'],
    'angular-translate': ['angular'],
    'angular-translate-loader-static-files': ['angular-translate'],
    'angular-ui-router': ['angular'],

    'angulartics': ['angular'],
    'angulartics-google-analytics': ['angulartics'],

    'bootstrap-sass': ['jquery'],

    'hljs': {
      exports: 'hljs'
    },

    'leaflet': {
      exports: 'L'
    },
    'leaflet.markercluster': ['leaflet']
  },

  deps: ['./bootstrap']
});
