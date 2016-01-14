'use strict';

define([
  'angular',
  'require',
  './app',
  './routes',
  './translate'
], function (angular, require) {

  require(['domReady!'], function (document) {
    angular.bootstrap(document, ['io.gatling']);
  });
});
