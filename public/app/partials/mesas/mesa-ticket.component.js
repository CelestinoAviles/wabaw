//---------------------------------------------------------//
// modulo **** MESA TICKET, lo que ve el cliente   *****
//---------------------------------------------------------//
(function() {

angular.module('mesas-tickets')
    .component('mesaTicket', {
        templateUrl: 'app/partials/mesas/mesa-ticket.template.html',
        controller: function MesasController($scope, $http, $routeParams, $location, servicio) {

            $scope.texto = "Mesa y mi ticket";
            $scope.verDetalleTicket = false;
            
            $scope.llamar = llamar;
            $scope.newTicket = newTicket;
            $scope.verTicket = verTicket;
            $scope.cerrarDetalleTicket = cerrarDetalleTicket;
            $scope.opinarTicketLinea = opinarTicketLinea;
            
            $scope.borrarTicketLinea = borrarTicketLinea;
            $scope.copiarTicketLinea = copiarTicketLinea;
            $scope.recalcularTicket = recalcularTicket;
            $scope.grabarArticuloOpinion = grabarArticuloOpinion;
            $scope.showTicketLineaOpinion = false;
            
                    var dispositivo = localStorage.getItem("dispositivo");
                    var preferencias = JSON.parse(dispositivo);
                    console.log('inicio: ' + preferencias);
                    $scope.nombre             = preferencias.nombre_dispositivo;
                    $scope.codigo_mesa        = preferencias.codigo_mesa;
                    $scope.idioma             = preferencias.idioma_dispositivo;
            
            $scope.showEstado = false;
            //  We'll load our list of Customers from our JSON Web Service into this variable
            $scope.listOfCustomers = null;

            //  When the user selects a "Customer" from our MasterView list, we'll set this variable.
            $scope.selectedCustomer = null;
            $scope.codigoSeleccionado = null;
            
            console.log($scope.codigo_mesa + ': mesa');
            loadMiMesa($scope.codigo_mesa);

            loadTickets = $scope.loadTickets;
            loadLineasTicket = $scope.loadLineasTicket;
            seleccionaMesa = $scope.seleccionaMesa;


            $scope.loadTickets = function () {
                console.log('entro para cargar los datos de la mesa');
                console.log($scope.codigoSeleccionado);
                $http({
                    method: 'GET',
                    url: '/tickets/api/v1/mesa-tickets/' + $scope.codigoSeleccionado
                }).then( function( response ) {
                        $scope.listOfOrders = response.data.GetBasketsForCustomerResult;
                        $scope.datTickets = response.data;
                        console.log('saco los tickets');
                        console.log(response.data);
                }, function (error) {
                    console.log('Error: ' + error);
                });
            }

            
            $scope.loadLineasTicket = function () {
                console.log('entro para cargar los datos de la mesa');
                console.log($scope.ticketSeleccionado);
                $http({
                    method: 'GET',
                    url: '/ticketslineas/api/v1/ticketslineas/' + $scope.ticketSeleccionado
                }).then( function( response ) {
                        $scope.listOfOrders = response.data.GetBasketsForCustomerResult;
                        $scope.datLineasTickets = response.data;
                        console.log('saco las lineas de los tickets');
                        console.log($scope.datLineasTickets);
                }, function (error) {
                    console.log('Error: ' + error);
                });
            }

            // Borrando linea de ticket
            function borrarTicketLinea (item) {
                console.log('entro para borrar una linea');
                console.log($scope.ticketSeleccionado);
                $scope.datSelTicketLinea = item;
                console.log($scope.datSelTicketLinea);
                if (!$scope.datSelTicketLinea.estado) {
                        alert('borrando');
                    } else {
                        alert('No se puede borrar porque tiene estado definido: ' + $scope.datSelTicketLinea.estado);
                    }

                return;

                $http({
                    method: 'GET',
                    url: '/ticketslineas/api/v1/ticketslineas/' + $scope.ticketSeleccionado
                }).then( function( response ) {
                        $scope.listOfOrders = response.data.GetBasketsForCustomerResult;
                        $scope.datLineasTickets = response.data;
                        console.log('saco las lineas de los tickets');
                }, function (error) {
                    console.log('Error: ' + error);
                });
            }


           // Copiar una linea para pedir otro producto igual
            function copiarTicketLinea (item) {
                console.log('entro para copiar una linea');
                console.log($scope.ticketSeleccionado);
                $scope.datSelTicketLinea = item;
                $scope.datSelTicketLinea.estado = null;
                console.log($scope.datSelTicketLinea);
                
                    $http({
                        method: 'POST',
                        url: '/ticketslineas/api/v1/ticketslineas', 
                        data: $scope.datSelTicketLinea
                    }).then( function( response ) {
                        $scope.datLineasTickets = response.data;
                    }, function (error) {
                        console.log('Error: ' + error);
                    });
            
                return;
                
            }            

            //
            // Recalcula el total de un ticket
            //
            function recalcularTicket(val) {
                // leo los tickets
                console.log($scope.ticketSeleccionado);
                console.log($scope.datLineasTickets);
                $scope.loadLineasTicket;
                // sumo los totales de las líneas
                console.log($scope.datLineasTickets);
                aux = orderTotal($scope.datLineasTickets);
                console.log(aux);
                // grabo el total
                console.log('VEO EL TICKET');
                $scope.datTickets[0].total = aux;
                console.log($scope.datTickets);
                $scope.datSel = $scope.datTickets[0];
                // grabo el ticket
                $scope.insert = false;
                $scope.update = true;
                $scope.grabar();
            };

            function orderTotal(listaDeLineas) {
                var total = 0;
                angular.forEach(listaDeLineas, function (product) {
                    console.log("entro en filtro " + product.cantidad + " * " + product.pvu + " <-" )
                    total += (parseFloat(product.cantidad) * parseFloat(product.pvu));
                    console.log("entro en filtro " + total.toFixed(2))
                });
                return total.toFixed(2);
            };

            $scope.seleccionaMesa = function (val) {
                $scope.codigoSeleccionado = val.id;
                $scope.loadTickets();
            };
        
            $scope.seleccionaTicket = function (val) {
                $scope.ticketSeleccionado = val.codigo;
                console.log($scope.ticketSeleccionado);
                console.log('Seleciona lineas');
                $scope.loadLineasTicket();
            };

            function llamar () {
                window.location = "#!/llamada";    
            };
            
            function loadMiMesa(auxPrm) {
                $http({
                    method: 'GET',
                    url: '/mesas/api/v1/mesas/' + auxPrm
                }).then( function( response ) {
                    $scope.dat = response.data;
                    console.log(data);
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
                }, function (error) {
                    console.log('Error: ' + error);
                });
            }

            function verTicket(item) {
                console.log($scope.datTickets);
                $scope.datSelTicket = $scope.datTickets[0];
                console.log($scope.datSelTicket);
                $scope.verDetalleTicket = true;
                $scope.insert = false;
                $scope.upate = false;
            }

            function cerrarDetalleTicket() {
                $scope.verDetalleTicket = false;
            }
            
            $scope.ver = function(item) {
                $scope.datSel = {};
                $scope.datSel = item;
                $scope.showCategoria = true;
                $scope.insert = false;
                $scope.upate = false;
            }

            $scope.edit = function(item) {
                $scope.ver(item);
                $scope.update = true;
            }

            $scope.cambiarEstado = function(item) {
                $scope.ver(item);
                $scope.showEstado = true;
                $scope.update = true;
            }
            
        
            $scope.delete = function(item) {
                var auxId = item.id;
                $http({
                    method: 'DELETE',
                    url: 'mesas/api/v1/mesas/' + auxId
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

            function newTicket() {
                $scope.datSel = { 
                    codigo: 0, 
                    cod_cliente:   1,
                    cod_empleado:  1,
                    cod_espacio:    $scope.codigo_mesa,
                    fecha_ticket:   new Date(),
                    fecha_modifica: '',
                    fecha_pago:     '',
                    observaciones:  '',
                    subtotal:       0,
                    prc_descuento:  0,
                    tot_descuento:  0,
                    prc_impuestos:  0,
                    tot_impuestos:  0,
                    total:          0,
                    total_entrega:  0,
                    total_cambio:   0
                };
                    
                $scope.insert = true;
                $scope.grabar();
            };
                
        
            $scope.volver = function() {
                $scope.datSel = {};
                $scope.showCategoria = false;
                mostrarDatos();
            }

            function opinarTicketLinea(item) {
                $scope.showTicketLineaOpinion = true;
                $scope.insert = true;
                console.log('entro para opinar sobre una linea');
                console.log($scope.ticketSeleccionado);
                $scope.datSelTicketLinea = item;
                console.log($scope.datSelTicketLinea);
                $scope.datSelArtOpi = {
                    login : '-',
                    codigoarticulo: $scope.datSelTicketLinea.cod_articulo,
                    valorgeneral: 5,
                    observaciones: null
                };
                
            };
            

            function grabarArticuloOpinion() {
                console.log($scope.datSelArtOpi);
                if ($scope.insert) {
                    $scope.insert = false;
                    $scope.showTicketLineaOpinion = false;

                    $http({
                        method: 'POST',
                        url: '/articulosopiniones/api/v1/articulosopiniones', 
                        data: $scope.datSelArtOpi
                    }).then( function( response ) {
                        $scope.datSelArtOpi = response.data;
                    }, function (error) {
                        console.log('Error: ' + error);
                    });
                };
            };



            $scope.grabar = function() {
                if ($scope.insert) {
                    $scope.showCategoria = false;
                    $scope.insert = false;
                    
                    $http({
                        method: 'POST',
                        url: '/tickets/api/v1/tickets', 
                        data: $scope.datSel
                    }).then( function( response ) {
                        $scope.dat = response.data;
                    }, function (error) {
                        console.log('Error: ' + error);
                    });
                }
                 else {
                     console.log('entro a modificar ticket');
                     console.log($scope.datSel);
                    $http({
                        method: 'PUT',
                        url: '/tickets/api/v1/tickets/' + $scope.datSel.codigo, 
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

})();
