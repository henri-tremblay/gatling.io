'use strict';

/**
 * @ngdoc function
 * @name gatling.io.controller:ServicesCtrl
 * @description
 * # ServicesCtrl
 * Controller of the services view
 */

var ServicesCtrl = function ($scope) {

  //------------------------------------------------------//
  //                   Scope variables                    //
  //------------------------------------------------------//

  $scope.definitions = [
    {
      name: 'DEFINITION_MINOR_RELEASE_TITLE',
      def: 'DEFINITION_MINOR_RELEASE'
    },
    {
      name: 'DEFINITION_ENTERPRISE_FIXES_TITLE',
      def: 'DEFINITION_ENTERPRISE_FIXES'
    },
    {
      name: 'DEFINITION_SNAPSHOTS_TITLE',
      def: 'DEFINITION_SNAPSHOTS'
    },
    {
      name: 'DEFINITION_COMMUNITY_MAILING_LIST_TITLE',
      def: 'DEFINITION_COMMUNITY_MAILING_LIST'
    },
    {
      name: 'DEFINITION_PRO_MAILING_LIST_TITLE',
      def: 'DEFINITION_PRO_MAILING_LIST'
    },
    {
      name: 'DEFINITION_EBIZ_TITLE',
      def: 'DEFINITION_EBIZ'
    }
  ];

  //------------------------------------------------------//
  //                   Scope functions                    //
  //------------------------------------------------------//

  $scope.defOpened = false;
  $scope.toggleDefinitions = function() {
    $scope.defOpened = !$scope.defOpened;
  };

};

angular.module('gatling.io').controller('ServicesCtrl', ['$scope', ServicesCtrl]);
