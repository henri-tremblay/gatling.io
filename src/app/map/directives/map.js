'use strict';

define([
  './module'
], function (module) {

  module.directive('gatlingMap', gatlingMap);

  gatlingMap.$inject = ['$timeout', 'MapService'];

  function gatlingMap($timeout, MapService) {

    return {
      replace: true,
      restrict: 'E',
      scope: {
        conf: '='
      },

      template: '<div id="{{ conf.id }}"></div>',

      link: function (scope, element) {

        $timeout(function () {
          MapService.init(element[0], scope.conf, []);
        });
      }
    };
  }
});
