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
    controller: function PagoTarjetaController($scope, $http, $routeParams, $location, $window) {
        var auxTxt = 'Pago con tarjeta'
            //      alert('Entro en ' + auxTxt);
        $scope.texto = auxTxt;

        this.pagarTarjeta = pagarTarjeta;
        this.volver = volver;
        
        var auxCodigoEspacio = $routeParams.idEspacio;
        var auxCodigoTicket  = $routeParams.idTicket;
        var auxTotal  = $routeParams.total;
        var auxTxt = 'Pago en efectivo'
            //            alert('Entro en ' + auxTxt);
        $scope.texto = auxTxt;
        
        $scope.codigo_mesa = auxCodigoEspacio;
        $scope.cod_ticket = auxCodigoTicket;
        $scope.total = auxTotal;

        console.log('Efectivo');
        console.log('Espacio:' + auxCodigoEspacio);
        console.log('Ticket' + auxCodigoTicket);
        console.log('Total'+  auxTotal);
        $scope.entrega = $scope.total;

        
        
        function pagarTarjeta() {
            
            auxDatosPago = { codTicket: auxCodigoTicket,
                             codEspacio: auxCodigoEspacio,
                             total: auxTotal,
                             entrega: $scope.entrega,
                             cambio: 0,
                             estado: 'PAG'
                           };

            console.log('Datos para el pago');
            console.log(auxDatosPago);
                    $http({
                        method: 'PUT',
                        url: '/tickets/api/v1/tickets/pagar/' + auxCodigoTicket, 
                        data: auxDatosPago
                    }).then( function( response ) {
                        $scope.dat = response.data;
                        $window.location.href = 'https://www.caixabank.es/particular/home/particulares_es.html';
                    }, function (error) {
                        console.log('Error: ' + error);
                    });

            volver();

        };
        
        function volver() {
            $location.path('#!/inicio');
        };

    }
});

