'use strict';

angular.
  module('core.filters.checkmark').
  filter('checkmark', function() {
    return function(input) {
      return input ? '\u2713' : '\u2718';
    };
  });
