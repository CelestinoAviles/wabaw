//---------------------------------------------------------//
// modulo **** MESA TICKET, lo que ve el cliente   *****
//---------------------------------------------------------//
(function() {

angular.module('mesas-tickets')
    .component('mesaTicketGeneral', {
        templateUrl: 'app/partials/mesas/mesa-ticket-general.template.html',
        controller: function MesasController($scope, $http, $routeParams, $location, servicio) {

            auxValor = $routeParams.id;
            $scope.texto = "Mesa y mi ticket";
            $scope.verDetalleTicket = false;
            
            $scope.llamar    = llamar;
            $scope.newTicket = newTicket;
            $scope.verTicket = verTicket;
            $scope.cerrarDetalleTicket = cerrarDetalleTicket;
            $scope.opinarTicketLinea   = opinarTicketLinea;
            
            $scope.borrarTicketLinea      = borrarTicketLinea;
            $scope.copiarTicketLinea      = copiarTicketLinea;
            $scope.recalcularTicket       = recalcularTicket;
            $scope.grabarArticuloOpinion  = grabarArticuloOpinion;
            $scope.showTicketLineaOpinion = false;
            
            $scope.codigo_espacio     = auxValor;
            
            
            
            
            
            
            $scope.showEstado = false;
            //  We'll load our list of Customers from our JSON Web Service into this variable
            $scope.listOfCustomers = null;

            //  When the user selects a "Customer" from our MasterView list, we'll set this variable.
            $scope.selectedCustomer = null;
            $scope.codigoSeleccionado = null;
            
            console.log($scope.codigo_espacio + ': espacio');
            loadMiMesa($scope.codigo_espacio);

            loadTickets = $scope.loadTickets;
            loadLineasTicket = $scope.loadLineasTicket;
            seleccionaMesa = $scope.seleccionaMesa;

            actualizoPreferencias();
            
            function actualizoPreferencias() {
                var dispositivo = localStorage.getItem("dispositivo");
                var preferencias = JSON.parse(dispositivo);

                var dispositivo = {
                    codigo_dispositivo: preferencias.codigo_dispositivo,
                    nombre_dispositivo: preferencias.nombre_dispositivo,
                    idioma_dispositivo: preferencias.idioma_dispositivo,
                    codigo_espacio    : $scope.codigo_espacio,
                };

                // Guardamos directo el JSON al localStorage:

                var dispositivoAGuardar = JSON.stringify(dispositivo);

                localStorage.setItem("dispositivo", dispositivoAGuardar );
                var dispositivoGuardado = localStorage.getItem("dispositivo");

                
                $scope.preferencias = dispositivo;
                
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
                    .success(function (data) {
                        $scope.listOfOrders = data.GetBasketsForCustomerResult;
                        $scope.datLineasTickets = data;
                        console.log('saco las lineas de los tickets');
                        console.log($scope.datLineasTickets);
                    })
                    .error(function (data, status, headers, config) {
                        $scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
                    });
            }

            // Borrando linea de ticket
            function borrarTicketLinea (index) {
                console.log('entro para borrar una linea');
                console.log($scope.ticketSeleccionado);
                $scope.datSelTicketLinea = $scope.datLineasTickets[index];
                console.log($scope.datSelTicketLinea);
                if (!$scope.datSelTicketLinea.estado) {
                        alert('borrando');
                    } else {
                        alert('No se puede borrar porque tiene estado definido: ' + $scope.datSelTicketLinea.estado);
                    }

                return;
                
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
            

           // Copiar una linea para pedir otro producto igual
            function copiarTicketLinea (index) {
                console.log('entro para copiar una linea');
                console.log($scope.ticketSeleccionado);
                $scope.datSelTicketLinea = $scope.datLineasTickets[index];
                $scope.datSelTicketLinea.estado = null;
                console.log($scope.datSelTicketLinea);
                
                $http.post('/ticketslineas/api/v1/ticketslineas', $scope.datSelTicketLinea)
                        .success((data) => {
                        $scope.datLineasTickets = data;
                    })
                        .error((error) => {
                        console.log('Error: ' + error);
                    });
                
                return;
                
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
                $http.get('/mesas/api/v1/mesas/' + auxPrm )
                    .success((data) => {
                    $scope.dat = data;
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
                })
                .error((error) => {
                    console.log('Error: ' + error);
                });
                
            }

            function verTicket(index) {
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

            function newTicket() {
                $scope.datSel = { 
                    codigo: 0, 
                    cod_cliente:   1,
                    cod_empleado:  1,
                    cod_espacio:    $scope.codigo_espacio,
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

            function opinarTicketLinea(index) {
                $scope.showTicketLineaOpinion = true;
                $scope.insert = true;
                console.log('entro para opinar sobre una linea');
                console.log($scope.ticketSeleccionado);
                $scope.datSelTicketLinea = $scope.datLineasTickets[index];
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

                    $http.post('/articulosopiniones/api/v1/articulosopiniones', $scope.datSelArtOpi)
                        .success((data) => {
                        $scope.datSelArtOpi = data;
                    })
                        .error((error) => {
                        console.log('Error: ' + error);
                    });
                };
            };



            $scope.grabar = function() {
                if ($scope.insert) {
                    $scope.showCategoria = false;
                    $scope.insert = false;
                    
                    $http.post('/tickets/api/v1/tickets', $scope.datSel)
                        .success((data) => {
                        $scope.dat = data;
                    })
                        .error((error) => {
                        console.log('Error: ' + error);
                    });
                }
                 else {
                     console.log('entro a modificar ticket');
                     console.log($scope.datSel);
                     $http.put('/tickets/api/v1/tickets/' + $scope.datSel.codigo, $scope.datSel)
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

})();
