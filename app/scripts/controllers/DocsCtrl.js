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

  $scope.talks = [
    'TALK_1',  'TALK_2',  'TALK_3',
    'TALK_4',  'TALK_5',  'TALK_6',
    'TALK_7',  'TALK_8',  'TALK_9',
    'TALK_10', 'TALK_11', 'TALK_12',
    'TALK_13', 'TALK_14', 'TALK_15',
    'TALK_16', 'TALK_17', 'TALK_19',
    'TALK_20', 'TALK_21', 'TALK_22',
    'TALK_23', 'TALK_24', 'TALK_25',
    'TALK_26'
  ];


};

angular.module('gatling.io').controller('DocsCtrl', ['$scope', '$location', DocsCtrl]);
