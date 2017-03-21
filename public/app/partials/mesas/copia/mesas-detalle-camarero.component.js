//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
// Define the `Menu de inicio` module
//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
angular.module('mesasDetalleCamarero')
    .component('mesasDetalleCamarero', {
        templateUrl: 'app/partials/mesas/mesas-detalle-camarero.template.html',
        controller: function MesasDetalleCamareroController($scope, $routeParams, $location) {
            var auxTxt = 'Listado de '
            var auxMesas = 'Listado de ddd';
            // alert('Entro en ' + auxTxt);
            $scope.texto = auxTxt;
            $scope.mesas = auxMesas;
            this.nuevo = function() {
                //   alert('Pedir más')
                $location.path('/mesas/$');
            }
            this.pedir = function() {
                //    alert('Pedido solicitado')
                $location.path('/mesas');
            }
            this.atendida = function() {
                //   alert('Mesa marcada como ya atendida')
                $location.path('/mesas');
            }
            this.servida = function() {
                //   alert('Mesa marcada como completamente servida')
                $location.path('/mesas');
            }
            this.liberaMesa = function() {
                //  alert('Mesa liberada y preparada para otro cliente')
                $location.path('/mesas/$');
            }
            this.pagar = function() {
                //  alert('Mesa va a pagar')
                $location.path('/pago');
            }
            this.atras = function() {
                $location.path('/mesasListado');
            }
        }

    });