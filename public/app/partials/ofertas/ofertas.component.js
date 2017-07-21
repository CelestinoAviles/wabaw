//---------------------------------------------------------//
// modulo **** OFERTAS *****
//---------------------------------------------------------//
angular.module('ofertas')
    .component('ofertas', {
        templateUrl: 'app/partials/ofertas/ofertas.template.html',
        controller: function ofertasController($scope, $http, $routeParams, $location) {

            var auxEntidad = 'ofertas';
            var auxRuta = '/ofertas/api/v1/ofertas';
            console.log('Entro en ' + auxEntidad);
            

            $scope.texto = auxEntidad.toUpperCase();
            $scope.dat = [];
            $scope.datSel = [];
            $scope.showCategoria = false;
            $scope.insert = false;
            $scope.update = false;

            mostrarDatos();

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
                console.log($scope.datSel);
                $scope.showCategoria = true;
                $scope.insert = false;
                $scope.upate = false;
            }

            $scope.edit = function(item) {
                $scope.ver(item);
                $scope.update = true;
            }

        
            $scope.delete = function(item) {
            
                var auxId = item.id;
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
                $scope.datSel.fechaInicio = $scope.FechaActual;
                $scope.datSel.fechaFin = sumarDias($scope.datSel.fechaInicio, 7);
                $scope.showCategoria = true;
                $scope.insert = true;
            }

            $scope.FechaActual = new Date();
            
            function sumarDias(fecha, dias){
                fecha.setDate(fecha.getDate() + dias);
                return fecha;}
            
            
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
                        url: auxRuta + '/' + $scope.datSel.id, 
                        data: $scope.datSel
                    }).then( function( response ) {
                        $scope.dat = response.data;
                    }, function (error) {
                        console.log('Error: ' + error);
                    });

                    mostrarDatos();
                    $scope.showCategoria = false;
                    $scope.insert = false;
                };
            }
        }
    });
