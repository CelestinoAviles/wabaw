'use strict';

// Define el módulo principal de la aplicación y los módulos de los que tiene dependencias.
angular.module('pago', [
    'ngRoute',
    'pagoEfectivo',
    'pagoPaypal',
    'pagoTarjeta'
]);
