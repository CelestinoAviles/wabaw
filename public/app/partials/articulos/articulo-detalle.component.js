//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
// Define the `Menu de inicio` module
//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
(function(){

angular.module('articulos')
    .directive('articuloDetallePaneles', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/partials/articulos/articulo-detalle-paneles.template.html'
        };
    })
    .component('articuloDetalle', {
        templateUrl: 'app/partials/articulos/articulo-detalle.template.html',
        controller: ['$http','$scope', '$routeParams', '$location', function ArticuloDetalleController($http, $scope, $routeParams, $location) {
            
            var auxRutaArticulo = '/articulos/api/v1/articulos';

            // Tengo los datos de la mesa
            console.log('Preferencias');
            var dispositivo = localStorage.getItem("dispositivo");
            var preferencias = JSON.parse(dispositivo);
            
            var codigoArticulo = $routeParams.id;
            var pvp_venta = $routeParams.pvp_venta;

            // Si el PvpVenta está indefinido es porque voy a coger el precio que marca el artículo y no me viene de ninguna oferta.
            console.log('pvp_venta');
            console.log(pvp_venta);

            console.log(codigoArticulo);
            $scope.volver = volver;
            $scope.pedirArticulo = pedirArticulo;
            
    
            // Cargo todos los datos del artículo para mostrar el detalle.
            cargarDatosArticulo(codigoArticulo);

            // Tengo los datos del ticket
            console.log('Traigo los datos del ticket asociado a este espacio');
            cargoTicket(preferencias.codigo_espacio);
            console.log('He terminado de traer las cosas del ticket');

            
            function cargarDatosArticulo(auxPrm) {
                $scope.datosArticulo = [];
                $http.get( auxRutaArticulo + '/' + auxPrm )
                    .success((data) => {
                    $scope.datosArticulo = data[0];
                    console.log('saco los datos del artículo');
                    console.log($scope.datosArticulo);
                    $scope.texto_stock = 'Articulo en stock';
                    if (($scope.datosArticulo.stock_actual <= 0) || ($scope.datosArticulo.stock_actual == null )) {
                        $scope.texto_stock = 'Articulo agotado';
                    };
                    if (typeof pvp_venta === 'undefined' || !pvp_venta) { 
                        /* no hago nada, tengo el precio correcto */ 
                    } else {
                        $scope.datosArticulo.pvp_venta = pvp_venta;
                        console.log('Pongo el precio que me han traido de la oferta');
                    };
            

                })
                .error((error) => {
                    console.log('Error: ' + error);
                });
            
            };

            // Pido el artículo
            function pedirArticulo() {
                // Tengo la cantidad
                console.log('Cantidad: '+ $scope.count);

                // Tengo los datos del artículo
                console.log('Datos Artículo');
                console.log($scope.datosArticulo);
                
                console.log(preferencias); //true                
                
                // preparo el array de la linea de ticket
                $scope.datSelTicketLinea = { 
                    codigo:      null,
                    cod_ticket:   $scope.datTickets.codigo,
                    cod_articulo: $scope.datosArticulo.codigo,
                    cantidad:      $scope.count,
                    pvu:          $scope.datosArticulo.pvp_venta,
                    total:        $scope.datosArticulo.pvp_venta * $scope.count ,
                    estado:       null
                 };

                console.log('Antes de grabar y del timeout');
                graboTicketLinea();
                window.location = '#!/inicio';
                
            };

            function graboTicketLinea() {
                console.log('datos de la linea que voy a grabar')
                console.log($scope.datSelTicketLinea);
                $http.post('/ticketslineas/api/v1/ticketslineas', $scope.datSelTicketLinea)
                        .success((data) => {
                        $scope.datLineasTickets = data;
                    })
                        .error((error) => {
                        console.log('Error: ' + error);
                    });
            };
            
            function cargoTicket(auxEspacio) {
                // Me traigo los datos del ticket asociado a ese espacio y que no esté cerrado.
                ////
                console.log('Cargo el ticket de este espacio: ' + auxEspacio);
                $scope.datTickets = [];
                $http.get( '/tickets/api/v1/mesa-tickets/' + auxEspacio )
                    .success((data) => {
                    auxData = data;
                    $scope.datTickets = auxData[0];
                    console.log($scope.datTickets);

                    if (typeof $scope.datTickets == "undefined") {
                        console.log('Ticket no existe y lo doy de alta');
                        newTicket(auxEspacio);
                    } else {
                        console.log($scope.datTickets);
                        console.log('lo que traigo del ticket...');
                        
                    };
                    
                })
                .error((error) => {
                    console.log('Error: ' + error);
                });
            };

            
            function volver() {
                window.history.back();
            };


//            $scope.productos = productos;
            var auxTxt = 'Detalle de productos'
                //           alert('Entro en ' + auxTxt);
//            $scope.texto = auxTxt;

            function newTicket(prmEspacio) {
                $scope.datSel = { 
                    codigo: 0, 
                    cod_cliente:   1,
                    cod_empleado:  1,
                    cod_espacio:    prmEspacio,
                    fecha_ticket:   new Date(),
                    fecha_modifica: '',
                    fecha_pago:     '',
                    observaciones:  '',
                    subtotal:       0,
                    prc_descuento:  0,
                    tot_descuento:  0,
                    prc_impuestos:  0,
                    tot_impuestos:  0,
                    total:          0,
                    total_entrega:  0,
                    total_cambio:   0
                };
                    
                $http.post('/tickets/api/v1/tickets', $scope.datSel)
                    .success((data) => {
//                    $scope.dat = data;
                    $http.get( '/tickets/api/v1/mesa-tickets/' + prmEspacio )
                        .success((data) => {
                        auxData = data;
                        $scope.datTickets = auxData[0];
                        console.log($scope.datTickets);
                    });
                })
                    .error((error) => {
                    console.log('Error: ' + error);
                });
//
//                $window.location.reload();
            };
            
            
            
            this.verDetalle = function() {
                $location.path('/productoDetalle');
            };
            this.volver = function() {
                $location.path('/inicio');
            };

//            this.tab = 1;  Este no funciona por ahora. 
            $scope.tab = 0;

            $scope.selecTab = function(auxTab) {
              $scope.tab = auxTab;  
            };

            $scope.isSelected = function(auxTab) {
              return $scope.tab === auxTab;  
            };

        }
    ]});

})();