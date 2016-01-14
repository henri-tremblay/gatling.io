'use strict';

define([
  './module'
], function (module) {

  module.controller('TalksCtrl', TalksCtrl);

  function TalksCtrl(Constants) {
    var me = this;

    var talks = [];
    for (var i = Constants.Talks.Count; i > 0; i--) {
      talks.push('TALK_' + i);
    }

    me.talks = talks;
  }
});
