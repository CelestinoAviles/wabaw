//---------------------------------------------------------//
// modulo **** TICKETS   *****
//---------------------------------------------------------//

angular.module('ticketsLineas')
    .component('ticketsLineasCamarero', {
    templateUrl: 'app/partials/' + 'tickets_lineas' + '/' + 'tickets-lineas-camarero' + '.template.html',
    controller: function EntidadController($scope, $http, $routeParams, $location, $interval) {

  //      controller: function EntidadController($scope, $http, $routeParams, $location, NgTableParams) {
          
        var auxRuta = '/ticketslineas/api/v1/ticketslineas';
        var auxEntidad = 'Líneas de Tickets pendientes de cerrar';
        var glbIntervalo = 10000;  // 10 segundos

        $scope.rate = 1;
        $scope.max = 5;
        $scope.texto = auxEntidad.toUpperCase();
        $scope.dat = [];
        $scope.datSel = [];
        $scope.showCategoria = false;
        $scope.showEstado    = false;
        $scope.insert = false;
        $scope.update = false;
        $scope.anotarCocina = anotarCocina;
        $scope.anotarEnCurso = anotarEnCurso;
        $scope.anotarServido = anotarServido;
        $scope.anotarPreparado = anotarPreparado;

        var self = this;
            
        mostrarDatos();
        stop = $interval(function() {
            mostrarDatos();
        }, glbIntervalo);

        $scope.Salir = function () {
            $interval.cancel(stop);
            window.location = '/#!/inicio';
        };

        
            $scope.Salir = function () {
                window.location = '/#!/menuCamarero';
            };
        
            function mostrarDatos() {
                $scope.dat = [];
                
                $http({
                    method: 'GET',
                    url: auxRuta + '/camarero' 
                }).then( function( response ) {
                    $scope.dat = response.data;
                }, function (error) {
                    console.log('Error: ' + error);
                });

            
            }

            $scope.ver = function(item) {
                $scope.datSel = {};
                $scope.datSel = item;
                $scope.showCategoria = true;
                $scope.showEstado = false;
                $scope.insert = false;
                $scope.upate = false;
            }

            $scope.edit = function(item) {
                $scope.ver(item);
                $scope.update = true;
            }

            $scope.estado = function(item) {
                $scope.ver(item);
                $scope.update = true;
                $scope.showCategoria = false;
                $scope.showEstado = true;
            }

            function anotarEnCurso(item) {
                cambiarEstado(item, 'EN CURSO');  
            };

            function anotarCocina(item) {
                cambiarEstado(item, 'COCINA');  
            };

            function anotarPreparado(item) {
                cambiarEstado(item, 'PREPARADO');  
            };

            function anotarServido(item) {
                cambiarEstado(item, 'SERVIDO');  
            };

            function cambiarEstado(item, auxPrm) {
                $scope.ver(item);
                $scope.datSel.estado = auxPrm;
                $scope.insert = false;
                $scope.update = true;
                console.log('cambiando estado');
                console.log($scope.datSel);
                $scope.grabar();
            };
            
            $scope.delete = function(item) {
                var auxId = item.codigo;

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


//                    $scope.dat[$scope.index] = $scope.datSel;
                    $scope.showCategoria = false;
                    $scope.showEstado = false;
                    $scope.insert = false;
                };
            }
        }
    });
