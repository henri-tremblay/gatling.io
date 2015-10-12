'use strict';

/**
 * @ngdoc function
 * @name gatling.io.controller:CodeCtrl
 * @description
 * # CodeCtrl
 * Controller of the webcvApp
 */

var CodeCtrl = function($rootScope, $scope) {

  var scalaCode = $('#scala-code').html().trim();
  var nbLine =  scalaCode.split(/\r\n|\r|\n/).length;
  $scope.getNbLine = function(){
    return new Array(nbLine);
  };
};

angular.module('gatling.io').controller('CodeCtrl', ['$rootScope', '$scope', CodeCtrl]);
