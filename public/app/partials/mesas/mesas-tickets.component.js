//---------------------------------------------------------//
// modulo **** MESAS TICKETS *****
//---------------------------------------------------------//

angular.module('mesas-tickets')
    .component('mesasTickets', {
        templateUrl: 'app/partials/mesas/mesas-tickets.template.html',
        controller: function MesasController($scope, $http, $routeParams, $location, servicio) {

            $scope.texto = "Mesas Tickets";
            
            $scope.showEstado = false;
            //  We'll load our list of Customers from our JSON Web Service into this variable
            $scope.listOfCustomers = null;
            $scope.anotarAtendida = anotarAtendida;
            $scope.anotarPedido = anotarPedido;

            //  When the user selects a "Customer" from our MasterView list, we'll set this variable.
            $scope.selectedCustomer = null;
            $scope.codigoSeleccionado = null;
            
            mostrarDatos();
            
            function anotarAtendida(index) {
                $scope.datSel = $scope.dat[index];
                $scope.datSel.index = index;
                $scope.datSel.llamada = null;
                $scope.codigoSeleccionado = $scope.datSel.codigo;
                console.log($scope.datSel);
                $scope.grabar();
                
            };

            function anotarPedido(index) {
                $scope.datSel = $scope.dat[index];
                $scope.codigoSeleccionado = $scope.datSel.codigo;
                console.log($scope.datSel);
                window.location = '#!/mesaTicketGeneral/' + $scope.codigoSeleccionado;
                
            };

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
                    })
                    .error(function (data, status, headers, config) {
                        $scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
                    });
            }            

            $scope.loadLineasTicket = function () {
                console.log('entro para cargar los datos de la mesa');
                console.log($scope.ticketSeleccionado);
                $http.get('/ticketslineas/api/v1/ticketslineas/' + $scope.ticketSeleccionado )
                    //  The user has selected a Customer from our Drop Down List.  Let's load this Customer's records.
                    .success(function (data) {
                        $scope.listOfOrders = data.GetBasketsForCustomerResult;
                        $scope.datLineasTickets = data;
                        console.log('saco las lineas de los tickets');
                    })
                    .error(function (data, status, headers, config) {
                        $scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
                    });
            }            
            
            $scope.seleccionaMesa = function (val) {
                $scope.codigoSeleccionado = val.codigo;
                $scope.loadTickets();
            };
        
            $scope.seleccionaTicket = function (val) {
                $scope.ticketSeleccionado = val.codigo;
                console.log($scope.ticketSeleccionado);
                console.log('Seleciona lineas');
                $scope.loadLineasTicket();
            };
        
            function mostrarDatos() {
                $http.get('/mesas/api/v1/mesas')
                    .success((data) => {
                    $scope.dat = data;
                    $scope.codigoSeleccionado = $scope.dat[0].codigo;
                    
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
                
            };

            
            $scope.ver = function(index) {
                $scope.datSel = {};
                $scope.datSel = $scope.dat[index];
                $scope.datSel.index = index;
                $scope.showCategoria = true;
                $scope.insert = false;
                $scope.upate = false;
            }

            $scope.edit = function(index) {
                //                $scope.entity = $scope.mesas[index];
                //                $scope.entity.index = index;
                $scope.ver(index);
                $scope.update = true;
            }

            $scope.cambiarEstado = function(index) {
                $scope.ver(index);
                $scope.showEstado = true;
                $scope.update = true;
            }
            
        
            $scope.delete = function(index) {
                var auxCodigo = $scope.dat[index].codigo;
                $http.delete('mesas/api/v1/mesas/' + auxCodigo)
                    .success((data) => {
                    $scope.dat = data;
                })
                    .error((data) => {
                    console.log('Error: ' + data);
                });
            }


            $scope.newItem = function() {
                $scope.datSel = {};
                $scope.showCategoria = true;
                $scope.insert = true;
                
            }

            
            $scope.volver = function() {
                $scope.datSel = {};
                $scope.showCategoria = false;
                mostrarDatos();
            }

            
            $scope.grabar = function() {
                if ($scope.insert) {
                    $scope.showCategoria = false;
                    $scope.insert = false;
                    
                    $http.post('/mesas/api/v1/mesas', $scope.datSel)
                        .success((data) => {
                        $scope.dat = data;
                    })
                        .error((error) => {
                        console.log('Error: ' + error);
                    });
                }
                 else {
                     $http.put('/mesas/api/v1/mesas/' + $scope.datSel.codigo, $scope.datSel)
                         .success((data) => {
                        $scope.datSel = {};
                    })
                        .error((error) => {
                         console.log('Error: ' + error);
                     });

                    $scope.dat[$scope.index] = $scope.datSel;
                    $scope.showCategoria = false;
                    $scope.insert = false;
                };
                $scope.showEstado = false;
            }
        }
    });
