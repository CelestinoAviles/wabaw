//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
// Define the `Menu de inicio` module
//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
angular.module('productoOpina')
    .component('productoOpina', {
        templateUrl: 'app/partials/productos/producto-opina.template.html',
        controller: function ProductoOpinaController($scope, $routeParams, $location) {
            var auxTxt = 'Opiniones de productos'
                //       alert('Entro en ' + auxTxt);
            $scope.texto = auxTxt;

            this.volver = function() {
                $location.path('/productoOpina');
            }

        }
    });