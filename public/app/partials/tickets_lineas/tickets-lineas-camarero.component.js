//---------------------------------------------------------//
// modulo **** TICKETS   *****
//---------------------------------------------------------//

angular.module('ticketsLineas')
    .component('ticketsLineasCamarero', {
        templateUrl: 'app/partials/' + 'tickets_lineas' + '/' + 'tickets-lineas-camarero' + '.template.html',
        controller: function EntidadController($scope, $http, $routeParams, $location, NgTableParams) {

            var auxRuta = '/ticketslineas/api/v1/ticketslineas';
            var auxEntidad = 'Tickets lineas';
            $scope.rate = 1;
            $scope.max = 5;
            $scope.texto = auxEntidad.toUpperCase();
            $scope.dat = [];
            $scope.datSel = [];
            $scope.showCategoria = false;
            $scope.showEstado    = false;
            $scope.insert = false;
            $scope.update = false;
            $scope.anotarEnCurso = anotarEnCurso;
            $scope.anotarServida = anotarServida;

            var self = this;
            
            mostrarDatos();

            function mostrarDatos() {
                $scope.dat = [];
                $http.get( auxRuta + '/camarero' )
                    .success((data) => {
                    $scope.dat = data;
                    self.tableParams = new NgTableParams({}, { dataset: $scope.dat });
                    console.log(self.tableParams);
                    
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

            function anotarEnCurso(index) {
                cambiarEstado(index, 'EN CURSO');  
            };

            function anotarServida(index) {
                cambiarEstado(index, 'SERVIDO');  
            };

            function cambiarEstado(index, auxPrm) {
                $scope.ver(index);
                $scope.datSel.estado = auxPrm;
                $scope.insert = false;
                $scope.update = true;
                console.log('cambiando estado');
                console.log($scope.datSel);
                alert('1');
                $scope.grabar();
            };
            
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
