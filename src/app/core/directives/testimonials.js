'use strict';

define([
  './module'
], function (module) {

  module.directive('testimonials', testimonials);

  testimonials.$inject = ['Constants'];

  function testimonials(Constants) {

    return {
      restrict: 'A',

      link: function (scope, element) {
        element.carousel({interval: Constants.Intervals.Testimonials});
      }
    };
  }
});
