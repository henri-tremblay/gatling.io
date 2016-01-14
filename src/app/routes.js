'use strict';

define([
  './app'
], function (app) {

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'app/core/templates/main.html'
      })

      // Resources

      .state('cheat-sheet', {
        url: '/cheat-sheet/:version',
        templateUrl: 'app/core/templates/resources/cheat-sheet.html'
      })
      .state('documentation', {
        url: '/resources/documentation',
        templateUrl: 'app/core/templates/resources/documentation.html'
      })

      .state('download', {
        url: '/resources/download',
        templateUrl: 'app/core/templates/resources/download.html'
      })
      .state('talks', {
        url: '/resources/talks',
        templateUrl: 'app/core/templates/resources/talks.html',
        controller: 'TalksCtrl as talks'
      })
      .state('about', {
        url: '/resources/about',
        templateUrl: 'app/core/templates/resources/about.html'
      })

      // Services

      .state('services', {
        url: '/services',
        templateUrl: 'app/core/templates/services/services.html'
      })
      .state('training', {
        url: '/services/training',
        templateUrl: 'app/core/templates/services/training.html'
      })
      .state('frontline', {
        url: '/services/frontline',
        templateUrl: 'app/core/templates/services/frontline.html'
      })
      .state('why', {
        url: '/why',
        templateUrl: 'app/core/templates/presentation.html',
        controller: 'CompanyCtrl as company'
      })

      // Stories

      .state('stories', {
        url: '/stories',
        templateUrl: 'app/core/templates/stories.html'
      })
      .state('story', {
        url: '/stories/:story.html',
        templateUrl: 'app/core/templates/stories/skeleton.html',
        controller: 'StoriesCtrl as stories'
      })
      .state('story.detail', {
        templateUrl: function ($stateParams) {
          return '/app/core/templates/stories/' + $stateParams.story + '.html';
        }
      })

      // Company

      .state('values', {
        url: '/company/values',
        templateUrl: 'app/core/templates/presentation.html',
        controller: 'CompanyCtrl as company'
      })
      .state('history', {
        url: '/company/history',
        templateUrl: 'app/core/templates/presentation.html',
        controller: 'CompanyCtrl as company'
      })
      .state('team', {
        url: '/company/team',
        templateUrl: 'app/core/templates/presentation.html',
        controller: 'CompanyCtrl as company'
      })
      .state('contact', {
        url: '/company/contact',
        templateUrl: 'app/core/templates/company/contact.html',
        controller: 'MapCtrl as map'
      });
  }

  return app.config(appConfig);
});
