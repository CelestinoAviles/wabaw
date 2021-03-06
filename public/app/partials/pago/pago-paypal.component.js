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
    controller: function PagoPaypalController($http, $scope, $routeParams, $location, $window, servicio) {
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
        
        $scope.codigo_mesa = auxCodigoEspacio;
        $scope.cod_ticket = auxCodigoTicket;
        $scope.total = auxTotal;
        $scope.pagarPayPal = pagarPayPal;

        console.log('Efectivo');
        console.log('Espacio:' + auxCodigoEspacio);
        console.log('Ticket' + auxCodigoTicket);
        console.log('Total'+  auxTotal);
        $scope.entrega = $scope.total;

//
        //
        //
        //
        auxTotal = $scope.total;
        paypal.Button.render({


            env: 'sandbox',  // sandbox | production

            
            // Specify the style of the button

            style: {
                label: 'checkout', // checkout || credit
                size:  'medium',    // tiny | small | medium
                shape: 'rect',     // pill | rect
                color: 'gold'      // gold | blue | silver
            },

            // PayPal Client IDs - replace with your own
            // Create a PayPal app: https://developer.paypal.com/developer/applications/create

            client: {
                sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
//                sandbox:    'access_token$sandbox$yn8ytnxz9qffct76$1bebc454aad2444b36302a4cd16afae1',
//                sandbox:    'AFcWxV21C7fd0v3bYYYRCpSSRl31AjcR86Wy97tt0gvviEK8vr-ZWyfZ',
                production: '<insert production client id>'
            },

            
            commit: true, // Show a 'Pay Now' button

            // Wait for the PayPal button to be clicked

            payment: function() {

                // Make a client-side call to the REST api to create the payment

                return paypal.rest.payment.create(this.props.env, this.props.client, {
                    transactions: [
                        {
                            amount: { total: auxTotal, currency: 'EUR' }
                        }
                    ]
                });
            },


            // Wait for the payment to be authorized by the customer

            onAuthorize: function(data, actions) {
                return actions.payment.execute().then(function() {
                    document.querySelector('#paypal-button-container').innerText = 'Payment Complete!';
                    alert('Pago realizado');
                });
            }


        }, '#paypal-button');

        
        function volver() {
            $location.path('#!/inicio');
        };

        function pagarPayPal() {
            auxDatosPago = { codTicket: auxCodigoTicket,
                             codEspacio: auxCodigoEspacio,
                             total: auxTotal,
                             entrega: $scope.entrega,
                             cambio: $scope.entrega - auxTotal,
                             estado: 'PAY'
                           };

            console.log('Datos para el pago');
            console.log(auxDatosPago);
            auxUrl = 'https://www.paypal.me/Wabaw/' + auxDatosPago.total;
            servicio.abrirVentana( auxUrl );
            
            $http({
                method: 'PUT',
                url: '/tickets/api/v1/tickets/pagar/' + auxCodigoTicket, 
                data: auxDatosPago
            }).then( function( response ) {
                $scope.datSel = response.data;
                alert('En proceso de pago. Ahora solo falta confirmar que ha pagado');
            }, function (error) {
                console.log('Error: ' + error);
            });
            
    
            volver();

        };
        
    }
});
