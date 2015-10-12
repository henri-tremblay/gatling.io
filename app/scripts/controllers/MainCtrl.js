'use strict';

/**
 * @ngdoc function
 * @name gatling.io.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webcvApp
 */

var MainCtrl = function ($rootScope, $scope, $location, $translate, $window) {

  //-----------------------------------------------//
  //                   Watchers                    //
  //-----------------------------------------------//
  $scope.language = 'en';
  $rootScope.$on('$locationChangeSuccess', function () {
    $scope.location = $location.path();
  });

  $scope.changeLanguage = function (key) {
    $translate.use(key);
    $scope.language = key;
  };

  $scope.getLanguage = function () {
    return $translate.use();
  };

  //------------------------------------------------------//
  //                   Scope functions                    //
  //------------------------------------------------------//

  $scope.showLegals = false;
  $scope.toggleLegals = function(bool) {
    if (bool) {
      $scope.showLegals = !$scope.showLegals;
    }
  };

  $scope.redirect = function(url) {
    if (url) {
      $window.location.href = url;
    }
  };
};

angular.module('gatling.io').controller('MainCtrl', ['$rootScope', '$scope', '$location', '$translate', '$window', MainCtrl]);
