'use strict';

define([
  './app'
], function (app) {

  appConfig.$inject = ['$translateProvider', 'Constants'];

  function appConfig($translateProvider, Constants) {

    $translateProvider
      .useSanitizeValueStrategy('sanitize')
      .useStaticFilesLoader({
        prefix: Constants.Prefixes.Locales,
        suffix: '.json'
      })
      .preferredLanguage('en');
  }

  return app.config(appConfig);
});
