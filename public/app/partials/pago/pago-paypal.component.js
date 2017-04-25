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
    controller: function PagoPaypalController($http, $scope, $routeParams, $location, $window) {
        var auxTxt = 'Pago Paypal'
            //    alert('Entro en ' + auxTxt);
        $scope.texto = auxTxt;

        this.pagarPayPal = pagarPayPal;
        this.volver = volver;
        

        var auxCodigoEspacio = $routeParams.idEspacio;
        var auxCodigoTicket  = $routeParams.idTicket;
        var auxTotal  = $routeParams.total;
        var auxTxt = 'Pago en efectivo'
            //            alert('Entro en ' + auxTxt);
        $scope.texto = auxTxt;
        
        $scope.codigo_espacio = auxCodigoEspacio;
        $scope.cod_ticket = auxCodigoTicket;
        $scope.total = auxTotal;

        console.log('Efectivo');
        console.log('Espacio:' + auxCodigoEspacio);
        console.log('Ticket' + auxCodigoTicket);
        console.log('Total'+  auxTotal);
        $scope.entrega = $scope.total;

        
        
        this.volver = function() {
            $location.path('#!/inicio');
        }

        function pagarPayPal() {
            
            auxDatosPago = { codTicket: auxCodigoTicket,
                             codEspacio: auxCodigoEspacio,
                             total: auxTotal,
                             entrega: $scope.entrega,
                             cambio: $scope.entrega - auxTotal,
                             estado: 'PAG'
                           };

            console.log('Datos para el pago');
            console.log(auxDatosPago);
             $http.put('/tickets/api/v1/tickets/pagar/' + auxCodigoTicket, auxDatosPago)
                 .success((data) => {
                    $scope.datSel = {};
                    $window.location.href = 'http://www.paypal.com';
             })
                 .error((error) => {
                    console.log('Error: ' + error);
             });
        
            volver();

        };
        
    }
});






        function volver() {
            $location.path('#!/inicio');
        };
