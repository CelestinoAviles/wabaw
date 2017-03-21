//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
// Define the `Menu de inicio` module
//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
angular.module('pago')

.component('pago', {
    templateUrl: 'app/partials/pago/pago-seleccionar.template.html',
    controller: function PagoController($scope, $routeParams, $location) {
        var auxTxt = 'Seleccionar forma de pago'
            //            alert('Entro en ' + auxTxt);
        $scope.texto = auxTxt;

        this.volver = function() {
            $location.path('/mesas/$');
        }

    }
});