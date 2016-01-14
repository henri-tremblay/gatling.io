/**
 * Created by Jason Conard on 08/09/15.
 * That directive detects if the given element is on viewport
 * after some events and make this appear after a given delay in milliseconds.
 *
 * How to use : <div class="appear appear-opacity" scroll-detection="250"></div>
 * Make the div elem appear after 250ms when in viewport.
 *
 * Example of SCSS :
 *
 * .appear {
 *   transition : all 500ms ease-out;
 *
 *   &.appear-opacity {
 *     opacity: 0;
 *
 *     &.appear-visible {
 *       opacity: 1
 *     }
 *   }
 * }
 */
'use strict';

define([
  'angular',
  './module',
  'lodash'
], function (angular, module, _) {

  module.directive('scrollDetection', scrollDetection);

  scrollDetection.$inject = ['$document', '$timeout', '$window'];

  function scrollDetection($document, $timeout, $window) {

    function isElementInViewport(element) {
      var rect = element.getBoundingClientRect();
      var rectParent = element.parentNode.getBoundingClientRect();

      var inBoundsEl = (rect.bottom > 0 &&
      rect.right > 0 &&
      rect.top < (window.innerHeight || $document[0].documentElement.clientHeight) && /*or $(window).height() */
      rect.left < (window.innerWidth || $document[0].documentElement.clientWidth));
      /*or $(window).width() */

      var inBoundsParent = (rectParent.bottom > 0 &&
      rectParent.right > 0 &&
      rectParent.top < (window.innerHeight || $document[0].documentElement.clientHeight) && /*or $(window).height() */
      rectParent.left < (window.innerWidth || $document[0].documentElement.clientWidth));
      /*or $(window).width() */

      return inBoundsEl && inBoundsParent;
    }

    return function (scope, element, attributes) {
      var windowElem = angular.element($window);
      var itemTimeout = null;

      var checkOffset = function () {
        var time = +attributes.scrollDetection;
        time = _.isNaN(time) ? 0 : time;

        if (itemTimeout) {
          $timeout.cancel(itemTimeout);
        }
        if (isElementInViewport(element[0])) {
          itemTimeout = $timeout(function () {

            if (element[0].className.indexOf('appear-visible') < 0) {
              element.addClass('appear-visible');
            }
          }, time);
        }
      };

      windowElem.bind('scroll resize', checkOffset);
      windowElem.bind('customScrollCall', function () {
        $timeout(checkOffset, 250);
      });

      $timeout(checkOffset);
    };
  }
});
