'use strict';

define([
  './module',
  'lodash'
], function (module, _) {

  module.controller('CompanyCtrl', CompanyCtrl);

  CompanyCtrl.$inject = ['$scope', '$location', 'Constants'];

  function CompanyCtrl($scope, $location, Constants) {
    var me = this;

    var views = {
      values: {
        title: 'VALUES',
        content: [
          {
            title: 'VALUES_TITLE_1',
            img: 'open-source.png',
            text: 'VALUES_CONTENT_1'
          },
          {
            title: 'VALUES_TITLE_2',
            img: 'agility.png',
            text: 'VALUES_CONTENT_2'
          },
          {
            title: 'VALUES_TITLE_3',
            img: 'highperf.png',
            text: 'VALUES_CONTENT_3'
          }
        ]
      },
      why: {
        title: 'WHY',
        content: [
          {
            title: 'WHY_TITLE_1',
            img: 'reports.png',
            text: 'WHY_CONTENT_1'
          },
          {
            title: 'WHY_TITLE_2',
            img: 'concurrency.png',
            text: 'WHY_CONTENT_2'
          },
          {
            title: 'WHY_TITLE_3',
            img: 'codelike.png',
            text: 'WHY_CONTENT_3'
          },
          {
            title: 'WHY_TITLE_4',
            img: 'percentiles.png',
            text: 'WHY_CONTENT_4'
          }
        ]
      },
      history: {
        title: 'HISTORY',
        content: [
          {
            title: 'HISTORY_TITLE_1',
            img: 'ebiz.png',
            text: 'HISTORY_CONTENT_1'
          },
          {
            title: 'HISTORY_TITLE_2',
            img: 'gatling-logo.png',
            text: 'HISTORY_CONTENT_2'
          }
        ]
      },
      team: {
        title: 'TEAM',
        content: [
          {
            title: 'TEAM_TITLE_1',
            img: 'stephane.png',
            text: 'TEAM_CONTENT_1'
          },
          {
            title: 'TEAM_TITLE_2',
            img: 'guillaume.png',
            text: 'TEAM_CONTENT_2'
          },
          {
            title: 'TEAM_TITLE_3',
            img: 'flavien.png',
            text: 'TEAM_CONTENT_3'
          },
          {
            title: 'TEAM_TITLE_4',
            img: 'thomas.png',
            text: 'TEAM_CONTENT_4'
          },
          {
            title: 'TEAM_TITLE_5',
            img: 'ph.png',
            text: 'TEAM_CONTENT_5'
          },
          {
            title: 'TEAM_TITLE_6',
            img: 'ebiz.png',
            text: 'TEAM_CONTENT_6'
          }
        ]
      }
    };

    _.forEach(views, function (view) {
      _.forEach(view.content, function (content) {
        content.img = Constants.Prefixes.Images + content.img;
      });
    });

    me.views = views;
    me.selectedView = null;

    //-----------------------------------------------//
    //                   Watchers                    //
    //-----------------------------------------------//

    $scope.$watch('location', function () {
      if ($location.$$url === '/values') {
        me.selectedView = me.views.values;
      }

      switch ($location.$$url) {
        case '/company/values':
          me.selectedView = me.views.values;
          break;
        case '/why':
          me.selectedView = me.views.why;
          break;
        case '/company/history':
          me.selectedView = me.views.history;
          break;
        case '/company/team':
          me.selectedView = me.views.team;
          break;
        default:
          $location.$$url = '/';
      }
    });
  }
});
