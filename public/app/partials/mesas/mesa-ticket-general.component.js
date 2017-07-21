//---------------------------------------------------------//
// modulo **** MESA TICKET, lo que ve el cliente   *****
//---------------------------------------------------------//
(function() {

angular.module('mesas-tickets')
    .component('mesaTicketGeneral', {
        templateUrl: 'app/partials/mesas/mesa-ticket-general.template.html',
        controller: function MesasController($scope, $http, $routeParams, $location, servicio, $window) {

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
            loadLineasTicket              = $scope.loadLineasTicket;
            $scope.loadMiTicketLineas     = loadMiTicketLineas;

            $scope.showTicketLineaOpinion = false;
            $scope.codigo_mesa     = auxValor;

            // Actualizo el fichero local con el código de la mesa.
            pref = actualizoPreferencias(auxValor);
            $scope.preferencias = pref;
            console.log('preferencias:');
            console.log(pref);

            //  When the user selects a "Customer" from our MasterView list, we'll set this variable.
            $scope.selectedCustomer = null;
            $scope.codigoMesaSeleccionado = null;
            console.log('Cargo los datos de la mesa del espacio:' + $scope.codigo_mesa );
            loadMiMesa($scope.codigo_mesa);


            // Cargo el ticket que hay asociado a la mesa, si es que lo hay.
            var auxCodTicket= null;
            auxCodTicket = loadMiTicket($scope.codigo_mesa);
            console.log("Código ticket:" + auxCodTicket);
        
            $scope.showEstado = false;
            //  We'll load our list of Customers from our JSON Web Service into this variable
            $scope.listOfCustomers = null;

            // 
            // Mesa que solicita asistencia de un camarero.
            //
            function llamar () {
                window.location = "#!/llamada";    
            };
            

            //
            //Actualizo el fichero de local storage para cargar la mesa que he traido con el parámetro de entrada
            // 
            function actualizoPreferencias(auxPrm) {
                var dispositivo = localStorage.getItem("dispositivo");
                var preferencias = JSON.parse(dispositivo);

                var dispositivo = {
                    codigo_dispositivo: preferencias.codigo_dispositivo,
                    nombre_dispositivo: preferencias.nombre_dispositivo,
                    idioma_dispositivo: preferencias.idioma_dispositivo,
                    codigo_mesa       : auxPrm
                };

                // Guardamos directo el JSON al localStorage:
                var dispositivoAGuardar = JSON.stringify(dispositivo);

                localStorage.setItem("dispositivo", dispositivoAGuardar );
                var dispositivoGuardado = localStorage.getItem("dispositivo");
                
                return dispositivo
            };
            

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
                        console.log(response.data.length);
                        if (response.data.length > 0 ) {
                            codTicket = $scope.datTickets[0].codigo;
                            $scope.cod_ticket = codTicket;
                        }
                        else {
                            codTicket = 0;
                            $scope.cod_ticket = codTicket;
                            };
                        console.log('el número de ticket es: ' + $scope.cod_ticket );
                        // Recalculo el ticket
//                        recalcularTicket();
                        recalculo(codTicket);
                        loadMiTicketLineas(codTicket);
                }, function (error) {
                        $scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
                        codTicket = 0;
                        $scope.cod_ticket = codTicket;
                });

                return codTicket;
            }            


            function loadMiTicketLineas(auxCodTicket) {
                console.log('entro para cargar los datos de la mesa');
                console.log(auxCodTicket);
                
                $http({
                    method: 'GET',
                    url: '/ticketslineas/api/v1/ticketslineas/' + auxCodTicket
                }).then( function( response ) {
                    $scope.listOfOrders = response.data.GetBasketsForCustomerResult;
                    $scope.datLineasTickets = response.data;
                    console.log('saco las lineas de los tickets');
                    console.log($scope.datLineasTickets);
                    // Recalculo el ticket
                    //                        recalcularTicket();
                }, function (error) {
                    $scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
                });

            };
            
            
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
                    // Recalculo el ticket
                    recalcularTicket();
                }, function (error) {
                    $scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
                });
                
            }

            // Borrando linea de ticket   ////
            function borrarTicketLinea (item) {
                console.log('entro para borrar una linea. Ticket seleccionado');
                console.log($scope.ticketSeleccionado);
                $scope.datSelTicketLinea = item;
                console.log($scope.datSelTicketLinea);
                console.log($scope.datSelTicketLinea.codigo);
                if (!$scope.datSelTicketLinea.estado) {

                    var auxId = $scope.datSelTicketLinea.codigo;
                    var auxCodTicket = $scope.datSelTicketLinea.cod_ticket;
                    console.log(auxId);
                    console.log(auxCodTicket);

                    $http({
                        method: 'DELETE',
                        url: '/ticketslineas/api/v1/ticketslineas/' + auxId
                    }).then( function( response ) {
                        $scope.datLineasTickets = response.data;
                        console.log('Borrando: ' + auxCodTicket);
                        loadMiTicketLineas(auxCodTicket);
                        $scope.datLineasTickets = response.data;
                    }, function (error) {
                        console.log('Error: ' + error);
                    });
                    
                    
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
                    $scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
                });
            }            
            

           // Copiar una linea para pedir otro producto igual
            function copiarTicketLinea (item) {
                console.log('Copiar una linea y pedir una unidad');
                console.log($scope.datLineasTickets);
                console.log('Copiar esta y pedir una unidad');
                console.log(item);
                console.log('Este codigo de ticket');
                console.log(item.cod_ticket);
                $scope.datSelTicketLinea = item;
                $scope.datSelTicketLinea.estado = null;
                $scope.datSelTicketLinea.cantidad = 1;
                $scope.datSelTicketLinea.total = $scope.datSelTicketLinea.pvu;
                console.log('Este ticket');
                console.log($scope.datSelTicketLinea);
                
                $http({
                    method: 'POST',
                    url: '/ticketslineas/api/v1/ticketslineas', 
                    data: $scope.datSelTicketLinea
                }).then( function( response ) {
                        $scope.datLineasTickets = response.data;
                        recalcularTicket($scope.datTickets[0])
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
//                console.log($scope.ticketSeleccionado);
                console.log($scope.datLineasTickets);
//                $scope.loadLineasTicket;
                // sumo los totales de las líneas
                console.log($scope.datLineasTickets);
                aux = orderTotal($scope.datLineasTickets);
                console.log(aux);
                // grabo el total
                console.log('VEO EL TICKET');
                $scope.datTickets[0].total = aux;
                console.log($scope.datTickets);
                $scope.datSel = $scope.datTickets[0];
                console.log('antes de grabar:');
                console.log($scope.datSel);
//                $scope.datSel.codigo, $scope.datSel
//               / grabo el ticket
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

            $scope.seleccionaTicket = function (val) {
                $scope.ticketSeleccionado = val.codigo;
                console.log($scope.ticketSeleccionado);
                console.log('Seleciona lineas');
                $scope.loadLineasTicket();
            };


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
            

            //
            //
            //
            function recalculo(auxCod) {
                    console.log('entro a recalculo en bbdd:' + auxCod );
                    console.log(auxCod);
                
                    $http({
                        method: 'PUT',
                        url: '/tickets/api/v1/tickets/recalcular/' + auxCod, 
                    }).then( function( response ) {
                        $scope.datTickets = response.data;
                    }, function (error) {
                        console.log('Error: ' + error);
                    });
                
            };

            
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
                console.log('voy a grabar un nuevo ticket');
                console.log($scope.datSel);
                $scope.grabar();
//
                $window.location.reload();
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
                        url : '/articulosopiniones/api/v1/articulosopiniones', 
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
                        $scope.datSel = {};
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
                        $scope.datSel = {};
                    }, function (error) {
                        console.log('Error: ' + error);
                    });
                     
                     
                    $scope.showCategoria = false;
                    $scope.insert = false;
                };
                $scope.showEstado = false;
            }
        }
    });

})();
