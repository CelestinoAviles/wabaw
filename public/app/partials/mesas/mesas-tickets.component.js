//---------------------------------------------------------//
// modulo **** MESAS TICKETS *****
//---------------------------------------------------------//
angular.module('mesas-tickets', []);


angular.module('mesas-tickets')
.filter('countItemsInOrder', function () {
    return function (listOfProducts) {
        //  Count how many items are in this order
        var total = 0;
        angular.forEach(listOfProducts, function (product) {
            total += parseFloat(product.cantidad);
        });
        return total;
    }
})
   .filter('sumByKey', function() {
        return function(data, key) {
            if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
                return 0;
            }

            var sum = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                sum += parseFloat(data[i][key]);
            }

            return sum;
        };
    })
.filter('orderTotal', function () {
    return function (listOfProducts) {
        //  Calculate the total value of a particular Order
        var total = 0;
        angular.forEach(listOfProducts, function (product) {
            console.log("entro en filtro " + product.cantidad + " * " + product.pvu + " <-" )
            total += (parseFloat(product.cantidad) * parseFloat(product.pvu));
            console.log("entro en filtro " + total.toFixed(2))
        });
        return total.toFixed(2);
    }
})
    .component('mesasTickets', {
        templateUrl: 'app/partials/mesas/mesas-tickets.template.html',
        controller: function MesasController($scope, $http, $routeParams, $location, servicio) {

            $scope.texto = "Mesas Tickets";
            
            //  We'll load our list of Customers from our JSON Web Service into this variable
            $scope.listOfCustomers = null;

            //  When the user selects a "Customer" from our MasterView list, we'll set this variable.
            $scope.selectedCustomer = null;
            $scope.codigoSeleccionado = null;
            
            mostrarDatos();

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
                $scope.codigoSeleccionado = val.id;
                $scope.loadTickets();
            };
        
            $scope.seleccionaTicket = function (val) {
                alert('hhh');
                $scope.ticketSeleccionado = val.codigo;
                console.log($scope.ticketSeleccionado);
                console.log('Seleciona lineas');
                $scope.loadLineasTicket();
            };
        
            function mostrarDatos() {
                $http.get('/mesas/api/v1/mesas')
                    .success((data) => {
                    $scope.dat = data;
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

        
            $scope.delete = function(index) {
                var auxId = $scope.dat[index].id;
                $http.delete('mesas/api/v1/mesas/' + auxId)
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
                     $http.put('/mesas/api/v1/mesas/' + $scope.datSel.id, $scope.datSel)
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
            }
        }
    });
