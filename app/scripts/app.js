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
      templateUrl: 'views/main.html'
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
      templateUrl: 'views/services.html'
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
    .state('frontline', {
      url: '/services/frontline',
      templateUrl: 'views/frontline.html'
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
      templateUrl: function ($stateParams) {
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

app.run(['$rootScope', '$http', '$timeout', function ($rootScope, $http, $timeout) {

  $timeout(function () {
  }, 100);

  $http.get('conf/conf.json').success(function (data) {
    $rootScope.version = data.version;
  });
}]);

// Calling twitter
app.run(['$timeout', function ($timeout) {
  $timeout(function () {
    !function (d, s, id) {
      var js;
      var fjs = d.getElementsByTagName(s)[0];
      var p = /^http:/.test(d.location) ? 'http' : 'https';

      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + '://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);
      }
    }(document, 'script', 'twitter-wjs');
  }, 100);
}]);
