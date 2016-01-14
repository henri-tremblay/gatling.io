'use strict';

define([
  './module',
  'hljs'
], function (module, hljs) {

  module.directive('highlight', highlight);

  highlight.$inject = ['$timeout'];

  function highlight($timeout) {

    return {
      restrict: 'A',
      scope: false,

      link: function (scope, element) {
        $timeout(function () {
          hljs.highlightBlock(element[0]);
        });
      }
    };
  }
});
