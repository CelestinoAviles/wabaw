//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
// Define the `Menu de inicio` module
//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
angular.module('pagoTarjeta')

.component('pagoTarjeta', {
    templateUrl: 'app/partials/pago/pago-tarjeta.template.html',
    controller: function PagoTarjetaController($scope, $routeParams, $location, $window) {
        var auxTxt = 'Pago con tarjeta'
            //      alert('Entro en ' + auxTxt);
        $scope.texto = auxTxt;

        this.volver = function() {
            $location.path('/mesas');
        }
        this.enviar = function() {
            $window.location.href = 'http://www.lacaixa.com';
        }

    }
});