// myApp.config(['$httpProvider', function ($httpProvider) {
//     $httpProvider.defaults.useXDomain = true;
//     delete $httpProvider.defaults.headers.common['X-Requested-With'];
// }]);

// Defino las rutas en el fichero de configuración
'use strict';
var translations_en = {
    JUGAR: 'Play',
    OPINAR: 'Post',
    LLAMAR: 'Call',
    PEDIR: 'Menu',
    PREFERENCIAS: 'Settings',
    MICUENTA: 'My Bill',
    ESPACIO: 'Area',
    IDIOMA: 'Language',
    HEADLINE: 'What cool!',
    OFERTAS: 'Offers',
    PARAGRAPH: 'Srsly!',
    NAMESPACE: {
    PARAGRAPH: 'And it comes with awesome features!'
  }
};
var translations_es = {
    JUGAR: 'Jugar',
    OPINAR: 'Opinar',
    LLAMAR: 'Llamar',
    PEDIR: 'La Carta',
    PREFERENCIAS: 'Ajustes',
    MICUENTA: 'Mi cuenta',
    ESPACIO: 'Espacio',
    IDIOMA: 'Idioma',
    HEADLINE: 'Vaya lio!',
    OFERTAS: 'Ofertas',
    PARAGRAPH: 'Serio!',
    NAMESPACE: {
        PARAGRAPH: 'Y qué!'
    }
};

angular.module('wabaw')
    .config(['$translateProvider', function ($translateProvider) {
  // add translation table
        $translateProvider
            .translations('en', translations_en);

        $translateProvider
            .translations('es', translations_es)
            .preferredLanguage('es');

        
}]);


angular.
  module('wabaw').
  config(['$locationProvider' ,'$routeProvider', '$httpProvider',
    function config($locationProvider, $routeProvider, $httpProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider
          .when('/menuGestor', {
          template: '<menu-gestor></menu-gestor>'
      })
          .when('/juegos', {
          template: '<juegos></juegos>'
        }).
        when('/menuMantenimientos', {
          template: '<menu-mantenimientos></menu-mantenimientos>'
        }).
        when('/menuCocinero', {
          template: '<menu-cocinero></menu-cocinero>'
        }).
        when('/menuCamarero', {
          template: '<menu-camarero></menu-camarero>'
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
        when('/ticketLineaEstado/$', {
          template: '<ticket-linea-estado></ticket-linea-estado>'
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
        })
          .when('/usuarios', {
          template: '<usuarios></usuarios>'
        })
          .when('/moviles', {
          template: '<moviles></moviles>'
        })
          .when('/empleados', {
          template: '<empleados></empleados>'
        })
          .when('/estados', {
          template: '<estados></estados>'
        })
          .when('/articulos', {
          template: '<articulos></articulos>'
        })
          .when('/articulosVer/:id', {
          template: '<articulos-ver></articulos-ver>'
        })
          .when('/familias', {
          template: '<familias></familias>'
        })
          .when('/familiasVer', {
          template: '<familias-ver></familias-ver>'
        })
          .when('/artList', {
          template: '<art-list></art-list>'
        })
          .when('/artDetail/:Id', {
          template: '<art-detail></art-detail>'
        })
          .when('/articulosopiniones', {
          template: '<articulosopiniones></articulosopiniones>'
        })
          .when('/articuloOpiniones/:id', {
          template: '<articulo-opiniones></articulo-opiniones>'
        })
          .when('/articulosimagenes', {
          template: '<articulosimagenes></articulosimagenes>'
        })
          .when('/articuloImagenes/:id', {
          template: '<articulo-imagenes></articulo-imagenes>'
        })
          .when('/articuloDetalle/:id', {
          template: '<articulo-detalle></articulo-detalle>'
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
          .when('/postsGestor', {
          template: '<posts-gestor></posts-gestor>'
        })
          .when('/postsCliente', {
          template: '<posts-cliente></posts-cliente>'
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
          .when('/ticketsLineasCamarero', {
          template: '<tickets-lineas-camarero></tickets-lineas-camarero>'
        })
          .when('/ticketsLineasCocinero', {
          template: '<tickets-lineas-cocinero></tickets-lineas-cocinero>'
        })
          .when('/mesasTickets', {
          template: '<mesas-tickets></mesas-tickets>'
        })
          .when('/mesaTicket0', {
          template: '<mesa-ticket></mesa-ticket>'
        })
          .when('/mesaTicketGeneral/:id', {
          template: '<mesa-ticket-general></mesa-ticket-general>'
        })
          .when('/mesaTicketCliente/:id', {
          template: '<mesa-ticket-cliente></mesa-ticket-cliente>'
        })
          .when('/dispositivos', {
          template: '<dispositivos></dispositivos>'
        })
          .when('/dispositivopreferencias', {
          template: '<dispositivopreferencias></dispositivopreferencias>'
        })
          .when('/preferencias', {
          template: '<preferencias></preferencias>'
        })
          .when('/dispositivoByod', {
          template: '<dispositivo-byod></dispositivo-byod>'
        })
          .when('/llamada', {
          template: '<llamada></llamada>'
        })
        .otherwise('/inicio');
    }
  ]);
