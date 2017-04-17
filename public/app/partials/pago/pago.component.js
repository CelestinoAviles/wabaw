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
        console.log('inicio: ' + preferencias);
        $scope.dispositivo = preferencias.nombre_dispositivo;
        $scope.espacio     = preferencias.codigo_espacio;
        $scope.idioma      = preferencias.idioma_dispositivo;

        console.log('veo los datos de mi mesa');
        loadMiMesa($scope.espacio);
        
        

            function loadMiMesa(auxPrm) {
                $http.get('/mesas/api/v1/mesas/' + auxPrm )
                    .success((data) => {
                    $scope.dat = data;
                    console.log(data);
                    $scope.codigoSeleccionado = $scope.dat[0].id;
                    
                    console.log($scope.dat);
                    console.log($scope.codigoSeleccionado);
                    
                    $scope.listOfCustomers = data.GetAllCustomersResult;
                    //  If we managed to load more than one Customer record, then select the 
                    //  first record by default.
//                    $scope.selectedCustomer = $scope.listOfCustomers[0].CustomerID;

                    //  Load the list of Orders, and their Products, that this Customer has ever made.
                    //                    $scope.loadOrders();
                    $scope.loadTickets();
                })
                .error((error) => {
                    console.log('Error: ' + error);
                });
                
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