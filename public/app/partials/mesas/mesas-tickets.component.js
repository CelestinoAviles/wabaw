//---------------------------------------------------------//
// modulo **** MESAS TICKETS *****
//---------------------------------------------------------//

angular.module('mesas-tickets')
    .component('mesasTickets', {
        templateUrl: 'app/partials/mesas/mesas-tickets.template.html',
        controller: function MesasController($scope, $http, $routeParams, $location, servicio, $interval) {

            var glbIntervalo = 10000;  // 10 segundos
            $scope.texto = "Mesas Tickets";
            
            $scope.showEstado = false;
            //  We'll load our list of Customers from our JSON Web Service into this variable
            $scope.listOfCustomers = null;
            $scope.anotarAtendida = anotarAtendida;
            $scope.anotarPedido = anotarPedido;
            $scope.nuevaClave = nuevaClave;

            //  When the user selects a "Customer" from our MasterView list, we'll set this variable.
            $scope.selectedCustomer = null;
            $scope.codigoSeleccionado = null;
            
            mostrarDatos();
            stop = $interval(function() {
                mostrarDatos();
            }, glbIntervalo);

            $scope.Salir = function () {
                $interval.cancel(stop);
                window.location = '/#!/menuCamarero';
            };

            
            function anotarAtendida(item) {
                $scope.datSel = item;
//                $scope.datSel.index = index;
                $scope.datSel.llamada = null;
                $scope.codigoSeleccionado = item.codigo;
                console.log($scope.datSel);
                $scope.grabar();
                
            };

            function anotarPedido(item) {
                $scope.datSel = item;
                $scope.codigoSeleccionado = $scope.datSel.codigo;
                console.log($scope.datSel);
                window.location = '#!/mesaTicketGeneral/' + $scope.codigoSeleccionado;
                
            };

            $scope.loadTickets = function () {
                console.log('entro para cargar los datos de la mesa');
                console.log($scope.codigoSeleccionado);
                $http({
                    method: 'GET',
                    url: '/tickets/api/v1/mesa-tickets/' + $scope.codigoSeleccionado
                }).then( function( response ) {
                    $scope.dat = response.data;
                        $scope.listOfOrders = response.data.GetBasketsForCustomerResult;
                        $scope.datTickets = response.data;
                        console.log('saco los tickets');
                        console.log(response.data);
                }, function (error) {
                    console.log('Error: ' + error);
                });
            }            

            $scope.loadLineasTicket = function () {
                console.log('entro para cargar los datos de la mesa 2');
                console.log($scope.ticketSeleccionado);
                $http({
                    method: 'GET',
                    url: '/ticketslineas/api/v1/ticketslineas/' + $scope.ticketSeleccionado
                }).then( function( response ) {
                    $scope.dat = response.data;
                    $scope.listOfOrders = response.data.GetBasketsForCustomerResult;
                    $scope.datLineasTickets = response.data;
                    console.log('saco las lineas de los tickets');
                }, function (error) {
                    console.log('Error: ' + error);
                });
            }            
            
            $scope.seleccionaMesa = function (val) {
//                $scope.codigoSeleccionado = val.codigo;
//                $scope.loadTickets();
            };


            function nuevaClave(item) {
                $scope.datSel =item;
                $scope.codigoSeleccionado = item.codigo;
                var auxCodigo = item.codigo;
                console.log('nueva clave de:' + auxCodigo);
                $http({
                    method: 'PUT',
                    url: 'mesas/api/v1/mesas/nuevaClave/' + auxCodigo, 
                    data: $scope.dat
                }).then( function( response ) {
                    $scope.dat = response.data;
                    alert('clave generada correctamente');
                    mostrarDatos();

                }, function (error) {
                    console.log('Error: ' + error);
                });


            };

            
            $scope.seleccionaTicket = function (val) {
                $scope.ticketSeleccionado = val.codigo;
                console.log($scope.ticketSeleccionado);
                console.log('Seleciona lineas');
                $scope.loadLineasTicket();
            };

            //
            // Mostrar datos
            //
            function mostrarDatos() {
                console.log('mostrando datos');
                $http({
                    method: 'GET',
                    url: '/mesas/api/v1/mesas'
                }).then( function( response ) {
                    $scope.dat = response.data;
                    
//                    $scope.codigoSeleccionado = $scope.dat[0].codigo;
                    
                    console.log($scope.dat);
                    
//                    console.log($scope.codigoSeleccionado);
                    
//                    $scope.listOfCustomers = $scope.dat.GetAllCustomersResult;
                    console.log( $scope.listOfCustomers );
                    console.log('fff');
//                    $scope.listOfCustomers = data.GetAllCustomersResult;
                    //  If we managed to load more than one Customer record, then select the 
                    //  first record by default.
//                    $scope.selectedCustomer = $scope.listOfCustomers[0].CustomerID;

                    //  Load the list of Orders, and their Products, that this Customer has ever made.
                    //                    $scope.loadOrders();
//                    $scope.loadTickets();
                }, function (error) {
                    console.log('Error: ' + error);
                });
                
            };

            
            $scope.ver = function(item) {
                $scope.datSel = {};
                $scope.datSel = item;
                $scope.showCategoria = true;
                $scope.insert = false;
                $scope.upate = false;
            }

            $scope.edit = function(item) {
                //                $scope.entity = $scope.mesas[index];
                //                $scope.entity.index = index;
                $scope.ver(item);
                $scope.update = true;
            }

            $scope.cambiarEstado = function(item) {
                $scope.ver(item);
                $scope.showEstado = true;
                $scope.update = true;
            }
            
        
            $scope.delete = function(item) {
                var auxCodigo = item.codigo;
                $http({
                    method: 'DELETE',
                    url: 'mesas/api/v1/mesas/' + auxCodigo
                }).then( function( response ) {
                    $scope.dat = response.data;
                }, function (error) {
                    console.log('Error: ' + error);
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
                $scope.showEstado = false;
                mostrarDatos();
            }

            
            $scope.grabar = function() {
                if ($scope.insert) {
                    $scope.showCategoria = false;
                    $scope.insert = false;
                    
                    $http({
                        method: 'POST',
                        url: '/mesas/api/v1/mesas', 
                        data: $scope.datSel
                    }).then( function( response ) {
                        $scope.dat = response.data;
                    }, function (error) {
                        console.log('Error: ' + error);
                    });
                }
                 else {

                    $http({
                        method: 'PUT',
                        url: '/mesas/api/v1/mesas/' + $scope.datSel.codigo, 
                        data: $scope.datSel
                    }).then( function( response ) {
                        $scope.dat = response.data;
                    }, function (error) {
                        console.log('Error: ' + error);
                    });

//                    $scope.dat[$scope.index] = $scope.datSel;
                    $scope.showCategoria = false;
                    $scope.insert = false;
                };
                $scope.showEstado = false;
            }
        }
    });
