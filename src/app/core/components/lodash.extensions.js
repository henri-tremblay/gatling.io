'use strict';

define([
  'lodash'
], function (_) {

  _.mixin({

    isDefined: function (value) {
      return !this.isUndefined(value);
    },

    isNotNull: function (value) {
      return !this.isNull(value);
    },

    valueOrElse: function (value, defaultValue) {
      if (this.isNotNull(value) && this.isDefined(value)) {
        return value;
      }

      return defaultValue;
    }
  });
});
