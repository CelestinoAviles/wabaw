'use strict';

angular.
  module('core.factories.phone').
  factory('Phone', ['$resource',
    function($resource) {
      return $resource('api/phones/:id', {}, {
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
