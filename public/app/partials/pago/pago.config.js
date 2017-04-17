// Defino las rutas en el fichero de configuración
( function() {
    'use strict';

angular.
  module('pago').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/pago', {
          template: '<pago></pago>'
        }).
        when('/pagoEfectivo', {
          template: '<pago-efectivo></pago-efectivo>'
        }).
        when('/pagoPaypal', {
          template: '<pago-paypal></pago-paypal>'
        }).
        when('/pagoTarjeta', {
          template: '<pago-tarjeta></pago-tarjeta>'
        }).
      otherwise('/mesas');
    }
  ])
})();
