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
    controller: function PagoEfectivoController($http, $scope, $routeParams, $location) {

        var auxCodigoEspacio = $routeParams.idEspacio;
        var auxCodigoTicket  = $routeParams.idTicket;
        var auxTotal  = $routeParams.total;
        var auxTxt = 'Pago en efectivo'
            //            alert('Entro en ' + auxTxt);
        $scope.texto = auxTxt;
        
        $scope.codigo_espacio = auxCodigoEspacio;
        $scope.cod_ticket = auxCodigoTicket;
        $scope.total = auxTotal;

        var auxTxt = 'Seleccionar forma de pago'
            //            alert('Entro en ' + auxTxt);
        $scope.texto = auxTxt;
        this.pagar  = pagar;
        this.volver = volver;
        
        console.log('Efectivo');
        console.log('Espacio:' + auxCodigoEspacio);
        console.log('Ticket' + auxCodigoTicket);
        console.log('Total'+  auxTotal);

        $scope.entrega = $scope.total;

        function pagar() {
            
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
            })
                .error((error) => {
                 console.log('Error: ' + error);
             });
        
            volver();

        };


        function volver() {
            $location.path('#!/inicio');
        };

    }
});