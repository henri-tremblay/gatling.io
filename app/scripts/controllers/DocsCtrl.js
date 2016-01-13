'use strict';

/**
 * @ngdoc function
 * @name gatling.io.controller:DocCtrl
 * @description
 * # DocCtrl
 * Controller of the talks view
 */

var DocsCtrl = function ($scope) {

  //------------------------------------------------------//
  //                   Scope variables                    //
  //------------------------------------------------------//

  var MAX = 55; // FIXME Move in a constant factory

  var talks = [];
  for (var i = MAX; i > 0; i--) {
    talks.push('TALK_' + i);
  }

  $scope.talks = talks;
};

angular.module('gatling.io').controller('DocsCtrl', ['$scope', '$location', DocsCtrl]);
