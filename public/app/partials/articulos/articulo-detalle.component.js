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

            var codigoArticulo = $routeParams.id;
            console.log(codigoArticulo);
            $scope.volver = volver;
    
            cargarDatosArticulo(codigoArticulo);

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