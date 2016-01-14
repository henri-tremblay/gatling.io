'use strict';

define([
  './module'
], function (module) {

  module.directive('gatlingCheatSheet', gatlingCheatSheet);

  gatlingCheatSheet.$inject = ['$rootScope'];

  function gatlingCheatSheet($rootScope) {

    return {
      restrict: 'E',

      template: '<div ng-include="cheatSheetUrl"></div>',

      link: function (scope) {
        scope.cheatSheetUrl = 'docs/' + $rootScope.version + '/cheat-sheet.html';
      }
    };
  }
});
