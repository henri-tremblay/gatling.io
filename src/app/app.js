'use strict';

define([
  'angular',
  'angular-animate',
  'angular-cookies',
  'angular-sanitize',
  'angular-touch',
  'angular-translate',
  'angular-translate-loader-static-files',
  'angular-ui-router',
  'angulartics',
  'angulartics-google-analytics',
  './bootstrap',
  './core/module',
  './map/module'
], function (angular) {

  return angular.module('io.gatling', [
    'io.gatling.core',
    'io.gatling.map',
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngTouch',
    'angulartics',
    'angulartics.google.analytics',
    'pascalprecht.translate',
    'ui.router'
  ]);
});
