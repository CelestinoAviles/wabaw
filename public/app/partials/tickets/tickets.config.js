// Defino las rutas en el fichero de configuración
( function() {
    'use strict';

angular.
  module('tickets').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/ticketRecibo/:id', {
          template: '<ticket-recibo></ticket-recibo>'
        }).
      otherwise('/inicio');
    }
  ])
})();

