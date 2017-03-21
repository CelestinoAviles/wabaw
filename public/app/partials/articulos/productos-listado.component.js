//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
// Define the `Menu de inicio` module
//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
angular.module('productosListado')
    .component('productosListado', {
        templateUrl: 'app/partials/productos/productos-listado.template.html',
        controller: function MesasListadoController($scope, $routeParams, $location) {
            var auxTxt = 'Listado de productos'
                //    alert('Entro en ' + auxTxt);
            $scope.texto = auxTxt;


            this.verDetalle = function() {
                $location.path('/productoDetalle');
            }

            this.volver = function() {
                $location.path('/productos');
            }

        }
    });
