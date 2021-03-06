//---------------------------------------------------------//
// modulo **** TICKETS CABECERA   *****
//---------------------------------------------------------//

angular.module('tickets')
    .component('ticketCabecera', {
        templateUrl: 'app/partials/' + 'tickets' + '/' + 'ticket-cabecera' + '.template.html',
        controller: function EntidadController($scope, $http, $routeParams, $location) {

            var auxRuta = '/tickets/api/v1/tickets';
            var auxEntidad = 'Tickets Cabecera';
    
            $scope.rate = 1;
            $scope.max = 5;
            $scope.texto = auxEntidad.toUpperCase();;
            $scope.dat = [];
            $scope.datSel = [];
            $scope.showCategoria = true;
            $scope.showEstado    = false;
            $scope.insert = false;
            $scope.update = false;

            $scope.verCabecera = function() {

                $scope.dat = [];
                $http.get( auxRuta  + '/' + $scope.espacio )
                    .success((data) => {
                    $scope.dat = data;
                    console.log($scope.dat[0]);
                    alert($scope.dat[0].cod_espacio);
                    $scope.datSel = $scope.dat[0];
                })
                .error((error) => {
                    alert('Error');
                    console.log('Error: ' + error);
                });

                $scope.showCategoria = true;
                $scope.showEstado = false;
                $scope.insert = false;
                $scope.upate = false;

            }
            
            verPreferencias();
            mostrarDatos();
            
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
                $http({
                    method: 'GET',
                    url: auxRuta
                }).then( function( response ) {
                    $scope.dat = response.data;
                }, function (error) {
                    console.log('Error: ' + error);
                });
            
                $scope.verCabecera();

            
            };

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
                $http({
                    method: 'DELETE',
                    url: auxRuta + '/' + auxId
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
                mostrarDatos();
            }

            
            $scope.grabar = function() {
                if ($scope.insert) {
                    $scope.showCategoria = false;
                    $scope.insert = false;
                    
                    $http({
                        method: 'POST',
                        url: auxRuta, 
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
                        url: auxRuta + '/' + $scope.datSel.codigo, 
                        data: $scope.datSel
                    }).then( function( response ) {
                        $scope.datSel = {};
                    }, function (error) {
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



angular.module('tickets')
    .component('ticketCabeceraRecibo', {
    templateUrl: 'app/partials/' + 'tickets' + '/' + 'ticket-cabecera-recibo' + '.template.html',
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
            var auxRuta = '/tickets/api/v1/ticket/' + this.codigoticket;
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
