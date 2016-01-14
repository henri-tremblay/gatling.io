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
        var s = 'script';
        var id = 'twitter-wjs';

        $timeout(function () {
          var fjs = $document[0].getElementsByTagName(s)[0];
          var p = /^http:/.test($document[0].location) ? 'http' : 'https';

          if (!$document[0].getElementById(id)) {
            var js = $document[0].createElement(s);
            js.id = id;
            js.src = p + '://platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js, fjs);
          }
        });
      }
    };
  }
});
