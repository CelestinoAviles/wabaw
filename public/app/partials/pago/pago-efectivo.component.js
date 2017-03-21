//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
// Define the `Menu de inicio` module
//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
angular.module('pagoEfectivo')

.component('pagoEfectivo', {
    templateUrl: 'app/partials/pago/pago-efectivo.template.html',
    controller: function PagoEfectivoController($scope, $routeParams, $location) {
        var auxTxt = 'Pago en efectivo'
            //            alert('Entro en ' + auxTxt);
        $scope.texto = auxTxt;

        this.volver = function() {
            $location.path('/mesas/$');
        }

    }
});