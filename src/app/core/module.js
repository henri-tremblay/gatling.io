'use strict';

define([
  'angular',
  './components/all',
  './controllers/all',
  './directives/all',
  './templates/all'
], function (angular) {

  angular.module('io.gatling.core', [
    'io.gatling.core.components',
    'io.gatling.core.controllers',
    'io.gatling.core.directives',
    'io.gatling.core.templates'
  ]);
});
