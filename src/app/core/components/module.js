'use strict';

define([
  'angular',
  'config'
], function (angular, config) {

  var module = angular.module('io.gatling.core.components', []);
  module.constant('Config', config);

  return module;
});
