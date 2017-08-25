//---------------------------------------------------------//
// modulo -----              TICKET LINEAS            -----
//---------------------------------------------------------//

angular.module('ticketsLineas')
    .component('ticketLineas', {
        templateUrl: 'app/partials/' + 'tickets_lineas' + '/' + 'ticket-lineas' + '.template.html',
        controller: function EntidadController($scope, $http, $routeParams, $location) {

            var auxRuta = '/ticketslineas/api/v1/ticketslineas';
            var auxEntidad = 'Lineas del Ticket';
            $scope.rate = 1;
            $scope.max = 5;
            $scope.texto = auxEntidad.toUpperCase();
            $scope.dat = [];
            $scope.datSel = [];
            $scope.showCategoria = false;
            $scope.showEstado    = false;
            $scope.insert = false;
            $scope.update = false;


            mostrarDatos();

            verPreferencias();
            alert($scope.espacio);
            
            function verPreferencias() {

                    var dispositivo = localStorage.getItem("dispositivo");
                    var preferencias = JSON.parse(dispositivo);
                    console.log('inicio: ' + preferencias);
                    $scope.dispositivo = preferencias.nombre_dispositivo;
                    $scope.espacio     = preferencias.codigo_mesa;
                    $scope.idioma      = preferencias.idioma_dispositivo;
            };
            
            function mostrarDatos() {
                $scope.dat = [];
                $http.get( auxRuta )
                    .success((data) => {
                    $scope.dat = data;
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
                $scope.showEstado = false;
                $scope.insert = false;
                $scope.upate = false;
            }

            $scope.edit = function(index) {
                $scope.ver(index);
                $scope.update = true;
            }

            $scope.estado = function(index) {
                $scope.ver(index);
                $scope.update = true;
                $scope.showCategoria = false;
                $scope.showEstado = true;
            }

            $scope.delete = function(index) {
                var auxId = $scope.dat[index].codigo;
                $http.delete(auxRuta + '/' + auxId)
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
                    
                    $http.post(auxRuta, $scope.datSel)
                        .success((data) => {
                        $scope.dat = data;
                    })
                        .error((error) => {
                        console.log('Error: ' + error);
                    });
                }
                 else {
                     $http.put(auxRuta + '/' + $scope.datSel.codigo, $scope.datSel)
                         .success((data) => {
                        $scope.datSel = {};
                    })
                        .error((error) => {
                         console.log('Error: ' + error);
                     });

                    $scope.dat[$scope.index] = $scope.datSel;
                    $scope.showCategoria = false;
                    $scope.showEstado = false;
                    $scope.insert = false;
                };
            }
        }
    });

angular.module('ticketsLineas')
    .component('ticketLineasRecibo', {
    templateUrl: 'app/partials/' + 'tickets_lineas' + '/' + 'ticket-lineas-recibo' + '.template.html',
    controller: function EntidadController($scope, $http, $routeParams) {
        
        var vm = this;
        this.$onInit = function () {
        
            console.log('muestro parametro');
            console.log(vm);
            console.log('fin muestro parametro');
        
            console.log(`contacto id from controller: ${this.codigoticket}`);
            console.log('contacto id from controller: ' + this.codigoticket);
            console.log(this);
            console.log('entro en cabecera recibo');
            var auxRuta = '/ticketslineas/api/v1/ticketslineas/' + this.codigoticket;

            console.log(auxRuta);
    
            buscarDatos();
        
            function buscarDatos() {
                $scope.dat = [];
                $http({
                    method: 'GET',
                    url: auxRuta
                }).then( function( response ) {
                    $scope.dat = response.data;
                    $scope.datSel = response.data[0];
                    
                    console.log('---');
                    console.log($scope.dat);
                    console.log($scope.datSel);
                    console.log('---!');

                }, function (error) {
                    console.log('Error: ' + error);
                });
            };
        };
    },
    bindings: {
        "codigoticket": '@'
    }
});
