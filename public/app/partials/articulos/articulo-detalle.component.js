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
            console.log(codigoArticulo);
            $scope.volver = volver;
            $scope.pedirArticulo = pedirArticulo;
            
    
            cargarDatosArticulo(codigoArticulo);

                // Tengo los datos del ticket
                console.log('Tickets');
                cargoTicket(preferencias.codigo_espacio);
                console.log('lo que traigo del ticket');

            
            function cargarDatosArticulo(auxPrm) {
                $scope.datosArticulo = [];
                $http.get( auxRutaArticulo + '/' + auxPrm )
                    .success((data) => {
                    $scope.datosArticulo = data[0];
                    console.log('saco los datos del artículo');
                    console.log($scope.datosArticulo);
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
                graboTicket();
                
            };

            function graboTicket() {
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
                console.log('-- ' + auxEspacio);
                $scope.datTickets = [];
                $http.get( '/tickets/api/v1/mesa-tickets/' + auxEspacio )
                    .success((data) => {
                    auxData = data;
                    $scope.datTickets = auxData[0];
                    
                    console.log($scope.datTickets);
                    console.log('lo que traigo del ticket...');
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