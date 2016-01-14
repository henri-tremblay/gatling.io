'use strict';

define([
  'angular',
  './controllers/map',
  './directives/map',
  './services/map'
], function (angular) {

  return angular.module('io.gatling.map', [
    'io.gatling.map.controllers',
    'io.gatling.map.directives',
    'io.gatling.map.services'
  ]);
});
