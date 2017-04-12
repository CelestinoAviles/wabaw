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
                    $scope.espacio     = preferencias.codigo_espacio;
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
