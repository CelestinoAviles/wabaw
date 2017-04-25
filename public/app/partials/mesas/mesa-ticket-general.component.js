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
            $scope.codigo_espacio     = auxValor;

            // Actualizo el fichero local con el código de la mesa.
            pref = actualizoPreferencias(auxValor);
            $scope.preferencias = pref;
            console.log('preferencias:');
            console.log(pref);

            //  When the user selects a "Customer" from our MasterView list, we'll set this variable.
            $scope.selectedCustomer = null;
            $scope.codigoMesaSeleccionado = null;
            console.log('Cargo los datos de la mesa del espacio:' + $scope.codigo_espacio );
            loadMiMesa($scope.codigo_espacio);


            // Cargo el ticket que hay asociado a la mesa, si es que lo hay.
            var auxCodTicket= null;
            auxCodTicket = loadMiTicket($scope.codigo_espacio);
            console.log("Código ticket:" + auxCodTicket);
            console.log("Código ticket:" + auxCodTicket);
            console.log("Código ticket:" + auxCodTicket);
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
                    codigo_espacio    : auxPrm
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
                        console.log(data.length);
                        if (data.length > 0 ) {
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
                    })
                    .error(function (data, status, headers, config) {
                        $scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
                        codTicket = 0;
                        $scope.cod_ticket = codTicket;
                    });
                return codTicket;
            }            


            function loadMiTicketLineas(auxCodTicket) {
                console.log('entro para cargar los datos de la mesa');
                console.log(auxCodTicket);
                $http.get('/ticketslineas/api/v1/ticketslineas/' + auxCodTicket )
                    .success(function (data) {
                        $scope.listOfOrders = data.GetBasketsForCustomerResult;
                        $scope.datLineasTickets = data;
                        console.log('saco las lineas de los tickets');
                        console.log($scope.datLineasTickets);
                        // Recalculo el ticket
//                        recalcularTicket();
                    })
                    .error(function (data, status, headers, config) {
                        $scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
                    });
            };
            
            
            $scope.loadLineasTicket = function () {
                console.log('entro para cargar los datos de la mesa');
                console.log($scope.ticketSeleccionado);
                $http.get('/ticketslineas/api/v1/ticketslineas/' + $scope.ticketSeleccionado )
                    .success(function (data) {
                        $scope.listOfOrders = data.GetBasketsForCustomerResult;
                        $scope.datLineasTickets = data;
                        console.log('saco las lineas de los tickets');
                        console.log($scope.datLineasTickets);
                        // Recalculo el ticket
                        recalcularTicket();
                    })
                    .error(function (data, status, headers, config) {
                        $scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
                    });
            }

            // Borrando linea de ticket   ////
            function borrarTicketLinea (index) {
                console.log('entro para borrar una linea. Ticket seleccionado');
                console.log($scope.ticketSeleccionado);
                $scope.datSelTicketLinea = $scope.datLineasTickets[index];
                console.log($scope.datSelTicketLinea);
                console.log($scope.datSelTicketLinea.codigo);
                if (!$scope.datSelTicketLinea.estado) {

                        var auxId = $scope.datSelTicketLinea.codigo;
                        var auxCodTicket = $scope.datSelTicketLinea.cod_ticket;
                        console.log(auxId);
                        console.log(auxCodTicket);
                    
                        $http.delete('/ticketslineas/api/v1/ticketslineas/' + auxId)
                            .success((data) => {
                            $scope.datLineasTickets = data;
                            console.log('Borrando: ' + auxCodTicket);
                            loadMiTicketLineas(auxCodTicket);
                            $scope.datLineasTickets = data;
                        })
                            .error((data) => {
                            console.log('Error: ' + data);
                        });
                    
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
                console.log('Copiar una linea y pedir una unidad');
                console.log($scope.datLineasTickets);
                console.log('Copiar esta y pedir una unidad');
                console.log($scope.datLineasTickets[index]);
                console.log('Este codigo de ticket');
                console.log($scope.datLineasTickets[index].cod_ticket);
                $scope.datSelTicketLinea = $scope.datLineasTickets[index];
                $scope.datSelTicketLinea.estado = null;
                $scope.datSelTicketLinea.cantidad = 1;
                $scope.datSelTicketLinea.total = $scope.datSelTicketLinea.pvu;
                console.log('Este ticket');
                console.log($scope.datSelTicketLinea);
                
                $http.post('/ticketslineas/api/v1/ticketslineas', $scope.datSelTicketLinea)
                        .success((data) => {
                        $scope.datLineasTickets = data;
                        recalcularTicket($scope.datTickets[0])
                    })
                        .error((error) => {
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
            

            //
            //
            //
            function recalculo(auxCod) {
                    console.log('entro a recalculo en bbdd:' + auxCod );
                    console.log(auxCod);
                    $http.put('/tickets/api/v1/tickets/recalcular/' + auxCod)
                        .success((data) => {
                        $scope.datTickets = data;
                    })
                        .error((error) => {
                        console.log('Error: ' + error);
                    });
  
            };

            
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
//
                $window.location.reload();
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

//                    $scope.dat[$scope.index] = $scope.datSel;
                    $scope.showCategoria = false;
                    $scope.insert = false;
                };
                $scope.showEstado = false;
            }
        }
    });

})();
