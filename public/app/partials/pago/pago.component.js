//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
// Define the `Menu de inicio` module
//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
angular.module('pago')

.component('pago', {
    templateUrl: 'app/partials/pago/pago.template.html',
    controller: function PagoController($http, $scope, $routeParams, $location) {
        var auxTxt = 'Seleccionar forma de pago'
            //            alert('Entro en ' + auxTxt);
        $scope.texto = auxTxt;
        
    
        
        var dispositivo = localStorage.getItem("dispositivo");
        var preferencias = JSON.parse(dispositivo);
        console.log('inicio en pago veo lo que hay en preferencias: ');
        console.log(preferencias);
        $scope.dispositivo     = preferencias.nombre_dispositivo;
        $scope.codigo_espacio  = preferencias.codigo_espacio;
        $scope.idioma      = preferencias.idioma_dispositivo;

        console.log('veo los datos de mi mesa:' + $scope.codigo_espacio );
        loadMiMesa($scope.codigo_espacio);

            // Cargo el ticket que hay asociado a la mesa, si es que lo hay.
            var auxCodTicket= null;
            auxCodTicket = loadMiTicket($scope.codigo_espacio);
        
            //
            // Cargo los datos de la mesa
            //
            function loadMiMesa(auxPrm) {
                $http.get('/mesas/api/v1/mesas/' + auxPrm )
                    .success((data) => {
                    $scope.datMesa = data;
                    console.log('datos de la mesa seleccionada:' + auxPrm);
                    console.log(data);

                    $scope.codigoMesaSeleccionado = $scope.datMesa[0].codigo;
                    
                    console.log($scope.datMesa);
                    console.log('Codigo Mesa Seleccionado:' + auxPrm);
                    console.log($scope.codigoMesaSeleccionado);
                    
                    $scope.listOfCustomers = data.GetAllCustomersResult;

                })
                .error((error) => {
                    console.log('Error: ' + error);
                });
                
            }

        
                    // 
            // loadMiTicket
            function loadMiTicket(auxMesa) {
                console.log('entro para cargar los datos del ticket de la mesa: ' + auxMesa);
                console.log('entro para cargar los datos del ticket de la mesa: ' + $scope.codigoMesaSeleccionado);
                var codTicket = null;
                $http.get('/tickets/api/v1/mesa-tickets/' + auxMesa )
                    //  The user has selected a Customer from our Drop Down List.  Let's load this Customer's records.
                
                    .success(function (data) {
                        $scope.listOfOrders = data.GetBasketsForCustomerResult;
                        $scope.datTickets = data;
                        console.log('saco los tickets');
                        console.log(data);
                        codTicket = $scope.datTickets[0].codigo;
                        $scope.cod_ticket = codTicket;
                        $scope.total = $scope.datTickets[0].total;
                        console.log('el número de ticket es: ' + $scope.cod_ticket );
                        // Recalculo el ticket
//                        recalculo(codTicket);
//                        loadMiTicketLineas(codTicket);
                    })
                    .error(function (data, status, headers, config) {
                        $scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
                        codTicket = 0;
                        $scope.cod_ticket = codTicket;
                    });
                return codTicket;
            }            

        
            $scope.loadTickets = function () {
                console.log('entro para cargar los datos de la mesa');
                console.log($scope.codigoSeleccionado);
                $http.get('/tickets/api/v1/mesa-tickets/' + $scope.codigoSeleccionado )
                    //  The user has selected a Customer from our Drop Down List.  Let's load this Customer's records.
                    .success(function (data) {
                        $scope.listOfOrders = data.GetBasketsForCustomerResult;
                        $scope.datTickets = data;
                        console.log('saco los tickets');
                        console.log(data);
                        $scope.total = $scope.datTickets[0].total;
                    })
                    .error(function (data, status, headers, config) {
                        $scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
                        $scope.total = 0;
                    });
            }            
        
        
        this.volver = function() {
            $location.path('/inicio');
        }

    }
});
