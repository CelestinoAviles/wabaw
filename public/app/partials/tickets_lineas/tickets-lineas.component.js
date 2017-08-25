//---------------------------------------------------------//
// modulo **** TICKETS   *****
//---------------------------------------------------------//

angular.module('ticketsLineas')
    .component('ticketsLineas', {
        templateUrl: 'app/partials/' + 'tickets_lineas' + '/' + 'tickets--lineas' + '.template.html',
        controller: function EntidadController($scope, $http, $routeParams, $location) {

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

            mostrarDatos();
            stop = $interval(function() {
                mostrarDatos();
            }, glbIntervalo);

            $scope.Salir = function () {
                $interval.cancel(stop);
                window.location = '/#!/menuCamarero';
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
                        $scope.dat = response.data;
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
