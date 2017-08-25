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
        $scope.dispositivo = preferencias.nombre_dispositivo;
        $scope.codigo_mesa = preferencias.codigo_mesa;
        $scope.idioma      = preferencias.idioma_dispositivo;

        console.log('veo los datos de mi mesa:' + $scope.codigo_mesa );
        loadMiMesa($scope.codigo_mesa);

            // Cargo el ticket que hay asociado a la mesa, si es que lo hay.
            var auxCodTicket= null;
            auxCodTicket = loadMiTicket($scope.codigo_mesa);
        
            //
            // Cargo los datos de la mesa
            //
            function loadMiMesa(auxPrm) {
                $http({
                    method: 'GET',
                    url: '/mesas/api/v1/mesas/' + auxPrm
                }).then( function( response ) {
                    $scope.datMesa = response.data;
                    console.log('datos de la mesa seleccionada:' + auxPrm);
                    console.log(response.data);

                    $scope.codigoMesaSeleccionado = $scope.datMesa[0].codigo;
                    
                    console.log($scope.datMesa);
                    console.log('Codigo Mesa Seleccionado:' + auxPrm);
                    console.log($scope.codigoMesaSeleccionado);
                    
                    $scope.listOfCustomers = response.data.GetAllCustomersResult;
                }, function (error) {
                    console.log('Error: ' + error);
                });
                
            }

        
                    // 
            // loadMiTicket
            function loadMiTicket(auxMesa) {
                console.log('entro para cargar los datos del ticket de la mesa: ' + auxMesa);
                console.log('entro para cargar los datos del ticket de la mesa: ' + $scope.codigoMesaSeleccionado);
                var codTicket = null;

                $http({
                    method: 'GET',
                    url: '/tickets/api/v1/mesa-tickets/' + auxMesa
                }).then( function( response ) {
                        $scope.listOfOrders = response.data.GetBasketsForCustomerResult;
                        $scope.datTickets = response.data;
                        console.log('saco los tickets');
                        console.log(response.data);
                        codTicket = $scope.datTickets[0].codigo;
                        $scope.cod_ticket = codTicket;
                        $scope.total = $scope.datTickets[0].total;
                        console.log('el número de ticket es: ' + $scope.cod_ticket );
                        // Recalculo el ticket
//                        recalculo(codTicket);
//                        loadMiTicketLineas(codTicket);
                }, function (error) {
                        $scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
                        codTicket = 0;
                        $scope.cod_ticket = codTicket;
                });
                
                return codTicket;
            }            

        
            $scope.loadTickets = function () {
                console.log('entro para cargar los datos de la mesa');
                console.log($scope.codigoSeleccionado);

                $http({
                    method: 'GET',
                    url: '/tickets/api/v1/mesa-tickets/' + $scope.codigoSeleccionado
                }).then( function( response ) {
                        $scope.listOfOrders = data.GetBasketsForCustomerResult;
                        $scope.datTickets = data;
                        console.log('saco los tickets');
                        console.log(data);
                        $scope.total = $scope.datTickets[0].total;
                }, function (error) {
                        $scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
                        $scope.total = 0;
                });
            }            
        
        
        this.volver = function() {
            $location.path('/inicio');
        }

    }
});
