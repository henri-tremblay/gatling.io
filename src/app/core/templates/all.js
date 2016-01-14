'use strict';

define([
  'angular'
], function (angular) {

  var module = angular.module('io.gatling.core.templates', []);
  module.run(function () {
    // Some kind of hack to lure jshint out
  });

  // inject:templates:js
  // endinject

  return module;
});
