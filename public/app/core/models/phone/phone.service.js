'use strict';

angular.
  module('core.phone').
  factory('Phone', ['$resource',
    function($resource) {
      return $resource('phones/:id', {}, {
        getAll: {
          method: 'GET',
          params: {},
          isArray: true
        },
		get: {
          method: 'GET',
          params: {},
          isArray: false
        }
      });
    }
  ]);
