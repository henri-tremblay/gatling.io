'use strict';

define([
  './module',
  'lodash'
], function (module, _) {

  module.controller('StoriesCtrl', StoriesCtrl);

  StoriesCtrl.$inject = ['$http', '$location', '$state', '$stateParams', 'Constants'];

  function StoriesCtrl($http, $location, $state, $stateParams, Constants) {
    var me = this;

    var story = $stateParams.story;

    $http.get(Constants.Prefixes.Services + 'stories.json')
      .success(function (data) {
        pagination(data.stories);
      });

    var pagination = function (stories) {
      for (var index = 0; index < stories.length; index++) {
        if (story === stories[index].url && stories.length > 1) {
          if (index === 0) { // The story is the first element
            me.next = stories[index + 1];
          } else if (index === stories.length - 1) { // The story is the last element
            me.previous = stories[index - 1];
          } else {
            me.next = stories[index + 1];
            me.previous = stories[index - 1];
          }
        }
      }
    };

    me.onSwitchStory = function (story) {
      if (_.isDefined(story)) {
        window.scrollTo(0, 0);

        $location.path('/stories/' + story + '.html');
      }
    };

    $state.transitionTo('story.detail', {story: $stateParams.story});
  }
});
