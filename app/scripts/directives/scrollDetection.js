/*
  Copyright © 2015 by eBusiness Information
  All rights reserved. This source code or any portion thereof
  may not be reproduced or used in any manner whatsoever
  without the express written permission of eBusiness Information.
*/
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
app.directive("scrollDetection", ["$window", "$timeout", function($window, $timeout) {
 return function(scope, element, attrs) {
   var windowElem = angular.element($window);
   var itemTimeout = null;


   function isElementInViewport (el) {

     //special bonus for those using jQuery
     if (typeof jQuery === "function" && el instanceof jQuery) {
       el = el[0];
     }

     var rect = el.getBoundingClientRect();
     var rectParent = el.parentNode.getBoundingClientRect();

     var inBoundsEl = (rect.bottom > 0 &&
         rect.right > 0 &&
         rect.top < (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
         rect.left < (window.innerWidth || document.documentElement.clientWidth)); /*or $(window).width() */

     var inBoundsParent = (rectParent.bottom > 0 &&
         rectParent.right > 0 &&
         rectParent.top < (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
         rectParent.left < (window.innerWidth || document.documentElement.clientWidth)); /*or $(window).width() */


     return inBoundsEl && inBoundsParent;
   }

   var checkOffset = function() {

     var time = +attrs['scrollDetection'];
     time = isNaN(time) ? 0 : time;

     if(itemTimeout) {
       $timeout.cancel(itemTimeout);
     }
     if(isElementInViewport(element)) {
       itemTimeout = $timeout(function () {

         if (element[0].className.indexOf('appear-visible') < 0) {
           element.addClass('appear-visible');
         }
       }, time);
     } else if(element[0].className.indexOf('appear-visible') >= 0) {
       if(attrs['alwaysVisible'] !== "ok") {
         element.removeClass('appear-visible');
       }
     }
   };

   windowElem.bind("scroll resize", checkOffset);
   windowElem.bind('customScrollCall', function(){
     $timeout(checkOffset, 250);
   });

   $timeout(checkOffset);
 };
}]);