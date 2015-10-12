'use strict';


/**
 * @ngdoc overview
 * @name gatling.io
 * @description
 * # gatling.io
 *
 * Main module of the application.
 */

var app = angular.module('gatling.io', [
    'ngAnimate', 'ngCookies', 'ngResource',
    'ngSanitize', 'ngTouch', 'ui.router',
    'angulartics', 'angulartics.google.analytics',
    'pascalprecht.translate'
]);

app.config(['$stateProvider', '$urlRouterProvider', '$translateProvider', function ($stateProvider, $urlRouterProvider, $translateProvider) {

  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'ConceptCtrl'
    })
    .state('cheat-sheet', {
      url: '/cheat-sheet/:version',
      templateUrl: 'views/docs/cheat-sheet.html'
    })
    .state('docs', {
      url: '/docs',
      templateUrl: 'views/docs.html'
    })
    .state('talks', {
      url: '/docs/talks',
      templateUrl: 'views/docs/talks.html',
      controller: 'DocsCtrl'
    })
    .state('about', {
      url: '/docs/about',
      templateUrl: 'views/docs/about.html',
      controller: 'DocsCtrl'
    })
    .state('download', {
      url: '/download',
      templateUrl: 'views/download.html'
    })
    .state('values', {
      url: '/values',
      templateUrl: "views/presentation.html",
      controller: 'PresentationCtrl'
    })
    .state('why', {
      url: '/why',
      templateUrl: "views/presentation.html",
      controller: 'PresentationCtrl'
    })
    .state('history', {
      url: '/history',
      templateUrl: "views/presentation.html",
      controller: 'PresentationCtrl'
    })
    .state('team', {
      url: '/team',
      templateUrl: "views/presentation.html",
      controller: 'PresentationCtrl'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: "views/contact.html"
    })
    .state('services', {
      url: '/services',
      templateUrl: 'views/services.html',
      controller: 'ServicesCtrl'
      })
    .state('presentation', {
      url: '/presentation',
      templateUrl: "views/presentation.html",
      controller: 'PresentationCtrl'
    })
    .state('training', {
      url: '/services/training',
      templateUrl: 'views/training.html'
    })
    .state('stories', {
      url: '/stories',
      templateUrl: 'views/stories.html'
    })
    .state('story', {
      url: '/stories/:story.html',
      templateUrl: "views/stories/skeleton.html",
      controller: 'StoryCtrl'
    })
    .state('story.detail', {
      templateUrl: function ($stateParams){
        return '/views/stories/' + $stateParams.story + '.html';
      }
    });

  $urlRouterProvider.otherwise('/');

  $translateProvider
      .useStaticFilesLoader({
        prefix: '../locales/',
        suffix: '.json'
      })
      .preferredLanguage('en');
}]);

app.run(['$rootScope', '$http', function($rootScope, $http) {
  hljs.configure({classPrefix: ''});
  hljs.initHighlightingOnLoad();

  $http.get('conf/conf.json').success(function(data) {
    $rootScope.version = data.version;
  });
}]);
