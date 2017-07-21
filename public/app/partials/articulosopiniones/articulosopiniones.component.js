//---------------------------------------------------------//
// modulo **** ARTICULOS *****
//---------------------------------------------------------//

angular.module('articulosopiniones', [])

angular.module('articulosopiniones')
    .component('articulosopiniones', {
        templateUrl: 'app/partials/' + 'articulosopiniones' + '/' + 'articulosopiniones' + '.template.html',
        controller: function EntidadController($scope, $http, $routeParams, $location) {

            var auxRuta = '/articulosopiniones/api/v1/articulosopiniones';
            var auxEntidad = 'articulosopiniones';
            
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
                
                $http({
                    method: 'GET',
                    url: '/articulos/api/v1/articulos'
                }).then( function( response ) {
                    $scope.articulos = response.data;
                }, function (error) {
                    console.log('Error: ' + error);
                });
                
                $scope.valoraciones = [{
                    'valor': 1,
                    'nomvalor': 'Malo'
                }, {
                    'valor': 2,
                    'nomvalor': 'Regular'
                }, {
                    'valor': 3,
                    'nomvalor': 'Ni bueno ni malo'
                }, {
                    'valor': 4,
                    'nomvalor': 'Bueno'
                }, {
                    'valor': 5,
                    'nomvalor': 'Muy bueno'
                }];
                
                console.log($scope.valoraciones);


                
            }

            $scope.ver = function(item) {
                console.log(item);
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


        
            $scope.delete = function(item) {
                $scope.datSel = item;
                
                var auxId = item.codigo;
                console.log(auxId);
                
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


            $scope.miValorSeleccionado= null;
            
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

//                    $scope.dat[$scope.index] = $scope.datSel;
                    $scope.showCategoria = false;
                    $scope.insert = false;
                };
            }
        }
    });
