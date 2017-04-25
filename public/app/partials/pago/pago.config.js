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
        when('/pagoEfectivo/:idEspacio/:idTicket/:total', {
          template: '<pago-efectivo></pago-efectivo>'
        }).
        when('/pagoPaypal/:idEspacio/:idTicket/:total', {
          template: '<pago-paypal></pago-paypal>'
        }).
        when('/pagoTarjeta/:idEspacio/:idTicket/:total', {
          template: '<pago-tarjeta></pago-tarjeta>'
        }).
      otherwise('/mesas');
    }
  ])
})();
