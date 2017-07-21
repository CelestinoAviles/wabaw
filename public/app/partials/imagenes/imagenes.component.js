//---------------------------------------------------------//
// modulo **** IMAGENES *****
//---------------------------------------------------------//

var auxEntidad = 'imagenes';
var auxRuta = '/imagenes/api/v1/imagenes';
console.log('2 ' + auxEntidad);

angular.module(auxEntidad, [])

angular.module(auxEntidad)
    .component(auxEntidad, {
        templateUrl: 'app/partials/' + auxEntidad + '/' + auxEntidad + '.template.html',
        controller: function ImagenesController($scope, $http, $routeParams, $location) {

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
                        $scope.datSel = {};
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
