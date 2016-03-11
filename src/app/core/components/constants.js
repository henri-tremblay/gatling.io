'use strict';

define([
  './module'
], function (module) {

  var constants = {

    Intervals: {
      Testimonials: 5000
    },

    Prefixes: {
      Images: 'app/images/',
      Locales: 'app/locales/',
      Services: 'app/services/'
    },

    Talks: {
      Count: 57
    }
  };

  module.constant('Constants', constants);

  return constants;
});
