'use strict';

/**
 * @ngdoc function
 * @name gatling.io.controller:PresentationCtrl
 * @description
 * # PresentationCtrl
 * Controller of the presentation view
 */

var PresentationCtrl = function ($scope, $location) {

  //------------------------------------------------------//
  //                   Scope variables                    //
  //------------------------------------------------------//

  $scope.views = {
    values: {
      title: 'VALUES',
      content: [
        {
          title: 'VALUES_TITLE_1',
          img: 'images/open-source.png',
          text: 'VALUES_CONTENT_1'
        },
        {
          title: 'VALUES_TITLE_2',
          img: 'images/agility.png',
          text: 'VALUES_CONTENT_2'
        },
        {
          title: 'VALUES_TITLE_3',
          img: '/images/highperf.png',
          text: 'VALUES_CONTENT_3'
        }
      ]
    },
    why: {
      title: 'WHY',
      content: [
        {
          title: 'WHY_TITLE_1',
          img: 'images/reports.png',
          text: 'WHY_CONTENT_1'
        },
        {
          title: 'WHY_TITLE_2',
          img: 'images/concurrency.png',
          text: 'WHY_CONTENT_2'
        },
        {
          title: 'WHY_TITLE_3',
          img: 'images/codelike.png',
          text: 'WHY_CONTENT_3'
        },
        {
          title: 'WHY_TITLE_4',
          img: 'images/percentiles.png',
          text: 'WHY_CONTENT_4'
        }
      ]
    },
    history: {
      title: 'HISTORY',
      content: [
        {
          title: 'HISTORY_TITLE_1',
          img: 'images/ebiz.png',
          text: 'HISTORY_CONTENT_1'
        },
        {
          title: 'HISTORY_TITLE_2',
          img: 'images/gatling-logo.png',
          text: 'HISTORY_CONTENT_2'
        }
      ]
    },
    team: {
      title: 'TEAM',
      content: [
        {
          title: 'TEAM_TITLE_1',
          img: 'images/stephane.png',
          text: 'TEAM_CONTENT_1'
        },
        {
          title: 'TEAM_TITLE_2',
          img: 'images/guillaume.png',
          text: 'TEAM_CONTENT_2'
        },
        {
          title: 'TEAM_TITLE_3',
          img: 'images/flavien.png',
          text: 'TEAM_CONTENT_3'
        },
        {
          title: 'TEAM_TITLE_4',
          img: 'images/thomas.png',
          text: 'TEAM_CONTENT_4'
        },
        {
          title: 'TEAM_TITLE_5',
          img: 'images/ph.png',
          text: 'TEAM_CONTENT_5'
        },
        {
          title: 'TEAM_TITLE_6',
          img: 'images/ebiz.png',
          text: 'TEAM_CONTENT_6'
        }
      ]
    }
  };

  $scope.selectedView = null;

  //-----------------------------------------------//
  //                   Watchers                    //
  //-----------------------------------------------//

  $scope.$watch('location', function() {
    if ($location.$$url === '/values') {
      $scope.selectedView = $scope.views.values
    }
    switch ($location.$$url) {
      case '/values':
        $scope.selectedView = $scope.views.values;
        break;
      case '/why':
        $scope.selectedView = $scope.views.why;
        break;
      case '/history':
        $scope.selectedView = $scope.views.history;
        break;
      case '/team':
        $scope.selectedView = $scope.views.team;
        break;
      default:
        $location.$$url = '/';
    }
  });

};

angular.module('gatling.io').controller('PresentationCtrl', ['$scope', '$location', PresentationCtrl]);
