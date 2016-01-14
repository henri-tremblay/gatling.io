'use strict';

define([
  './module'
], function (module) {

  module.directive('gatlingCheatSheet', gatlingCheatSheet);

  gatlingCheatSheet.$inject = ['Config'];

  function gatlingCheatSheet(Config) {

    return {
      restrict: 'E',

      template: '<div ng-include="cheatSheetUrl"></div>',

      link: function (scope) {
        scope.cheatSheetUrl = 'docs/' + Config.version.stable + '/cheat-sheet.html';
      }
    };
  }
});
