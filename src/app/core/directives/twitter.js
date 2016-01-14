'use strict';

define([
  'angular',
  './module'
], function (angular, module) {

  module.directive('gatlingTwitter', gatlingTwitter);

  gatlingTwitter.$inject = ['$document', '$timeout'];

  function gatlingTwitter($document, $timeout) {

    return {
      replace: true,
      restrict: 'E',

      // @formatter:off
      template: '<a class="twitter-timeline" href="https://twitter.com/GatlingTool" ' +
                   'data-chrome="noborder" data-link-color="#cd6b00" data-widget-id="352752299174686720">' +
                  'Tweets by @GatlingTool' +
                '</a>',
      // @formatter:on

      link: function () {

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
          }($document[0], 'script', 'twitter-wjs');
        }, 100);
      }
    }
  }
});
