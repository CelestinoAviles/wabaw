// myApp.config(['$httpProvider', function ($httpProvider) {
//     $httpProvider.defaults.useXDomain = true;
//     delete $httpProvider.defaults.headers.common['X-Requested-With'];
// }]);

// Defino las rutas en el fichero de configuración
'use strict';
angular.
  module('wabaw').
  config(['$locationProvider' ,'$routeProvider', '$httpProvider',
    function config($locationProvider, $routeProvider, $httpProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/menu', {
          template: '<menu></menu>'
        }).
        when('/juegos', {
          template: '<juegos></juegos>'
        }).
        when('/menuMantenimientos', {
          template: '<menu-mantenimientos></menu-mantenimientos>'
        }).
        when('/inicio', {
          template: '<inicio></inicio>'
        }).
        when('/entidad1', {
          template: '<entidad1></entidad1>'
        }).
        when('/entidad2', {
          template: '<entidad2></entidad2>'
        }).
        when('/mesas', {
          template: '<mesas></mesas>'
        }).
        when('/mesas/$', {
          template: '<mesas-detalle-camarero></mesas-detalle-camarero>'
        }).
        when('/mesasListado', {
          template: '<mesas-listado></mesas-listado>'
        }).
        when('/ticketLineaEstado/$', {
          template: '<ticket-linea-estado></ticket-linea-estado>'
        }).
        when('/opinionesListado', {
          template: '<opiniones-listado></opiniones-listado>'
        }).
        when('/pago', {
          template: '<pago></pago>'
        }).
        when('/productosListado', {
          template: '<productos-listado></productos-listado>'
        }).
        when('/productoDetalle', {
          template: '<producto-detalle></producto-detalle>'
        }).
        when('/productoOpina', {
          template: '<producto-opina></producto-opina>'
        }).
        when('/pruebas', {
          template: '<pruebas></pruebas>'
        }).
        when('/pruebas2', {
          template: '<pruebas2></pruebas2>'
        }).
        when('/usuarios', {
          template: '<usuarios></usuarios>'
        })
          .when('/moviles', {
          template: '<moviles></moviles>'
        })
          .when('/empleados', {
          template: '<empleados></empleados>'
        })
          .when('/articulos', {
          template: '<articulos></articulos>'
        })
          .when('/artList', {
          template: '<art-list></art-list>'
        })
          .when('/artDetail', {
          template: '<art-detail></art-detail>'
        })
          .when('/articulosopiniones', {
          template: '<articulosopiniones></articulosopiniones>'
        })
          .when('/articulosimagenes', {
          template: '<articulosimagenes></articulosimagenes>'
        })
          .when('/art-total', {
          template: '<art-total></art-total>'
        })
          .when('/imagenes', {
          template: '<imagenes></imagenes>'
        })
          .when('/imagenescarrusel', {
          template: '<imagenescarrusel></imagenescarrusel>'
        })
          .when('/posts', {
          template: '<posts></posts>'
        })
          .when('/ofertas', {
          template: '<ofertas></ofertas>'
        })
          .when('/ofertasver001', {
          template: '<ofertasver001></ofertasver001>'
        })
          .when('/ofertascarrusel', {
          template: '<ofertascarrusel></ofertascarrusel>'
        })
          .when('/tickets', {
          template: '<tickets></tickets>'
        })
          .when('/ticket-cabecera', {
          template: '<ticket-cabecera></ticket-cabecera>'
        })
          .when('/ticketsLineas', {
          template: '<tickets-lineas></tickets-lineas>'
        })
          .when('/ticketLineas', {
          template: '<ticket-lineas></ticket-lineas>'
        })
          .when('/mesasTickets', {
          template: '<mesas-tickets></mesas-tickets>'
        })
          .when('/dispositivopreferencias', {
          template: '<dispositivopreferencias></dispositivopreferencias>'
        })
          .when('/preferencias', {
          template: '<preferencias></preferencias>'
        })
          .when('/llamada', {
          template: '<llamada></llamada>'
        })
        .otherwise('/inicio');
    }
  ]);
