'use strict';

define([
  './module'
], function (module) {

  module.controller('SiteCtrl', SiteCtrl);

  SiteCtrl.$inject = ['$rootScope', '$location', '$window', 'Config'];

  function SiteCtrl($rootScope, $location, $window, Config) {
    var me = this;

    me.version = Config.version;

    me.language = 'en';
    $rootScope.$on('$locationChangeSuccess', function () {
      me.location = $location.path();
    });

    me.isLegalsVisible = false;
    me.showLegals = function () {
      me.isLegalsVisible = true;
    };
    me.hideLegals = function () {
      me.isLegalsVisible = false;
    };

    me.redirect = function (url) {
      if (url) {
        $window.location.href = url;
      }
    };
  }
});
