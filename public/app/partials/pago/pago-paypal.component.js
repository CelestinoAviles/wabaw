//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
// Define the `Menu de inicio` module
//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
angular.module('pagoPaypal')

.component('pagoPaypal', {
    templateUrl: 'app/partials/pago/pago-paypal.template.html',
    controller: function PagoPaypalController($scope, $routeParams, $location, $window) {
        var auxTxt = 'Pago Paypal'
            //    alert('Entro en ' + auxTxt);
        $scope.texto = auxTxt;

        this.volver = function() {
            $location.path('/mesas');
        }

        this.enviar = function() {
            //   alert('123');
            $window.location.href = 'http://www.paypal.com';
        }
    }
});