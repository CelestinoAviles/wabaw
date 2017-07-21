//---------------------------------------------------------//
// modulo **** ARTICULOS *****
//---------------------------------------------------------//

angular.module('articulosimagenes')
    .component('articulosimagenes', {
        templateUrl: 'app/partials/' + 'articulosimagenes' + '/' + 'articulosimagenes' + '.template.html',
        controller: function EntidadController($scope, $http, $routeParams, $location, srvGeneral) {

            var auxRuta = '/articulosimagenes/api/v1/articulosimagenes';
            var auxEntidad = 'articulosimagenes';

            $scope.rate = 1;
            $scope.max = 5;
            $scope.texto = auxEntidad.toUpperCase();;
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
                
                // Consulto los artículos
                $http({
                    method: 'GET',
                    url: '/articulos/api/v1/articulos'
                }).then( function( response ) {
                    $scope.articulos = response.data;
                }, function (error) {
                    console.log('Error: ' + error);
                });

                // Consulto las imagenes
                $http({
                    method: 'GET',
                    url: '/imagenes/api/v1/imagenes'
                }).then( function( response ) {
                    $scope.imagenes = response.data;
                }, function (error) {
                    console.log('Error: ' + error);
                });
                
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
                $scope.ver(index);
                $scope.update = true;
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
                        url: auxRuta + '/' + $scope.datSel.id, 
                        data: $scope.datSel
                    }).then( function( response ) {
                        $scope.dat = response.data;
                    }, function (error) {
                        console.log('Error: ' + error);
                    });

                    $scope.dat[$scope.index] = $scope.datSel;
                    $scope.showCategoria = false;
                    $scope.insert = false;
                };
            }
        }
    });
