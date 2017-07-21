//---------------------------------------------------------//
// modulo **** FAMILIAS *****
//---------------------------------------------------------//

(function() {

var auxEntidad = 'familias';
var auxRuta = 'familias/api/v1/familias';
    
angular.module('familias')
    .component('familiasVer', {
        templateUrl: 'app/partials/' + auxEntidad + '/' + auxEntidad + '-ver.template.html',
        controller: function ImagenesController($scope, $http, $routeParams, $location) {

            $scope.texto = auxEntidad.toUpperCase();;
            $scope.dat = [];
            $scope.datSel = [];
            $scope.showCategoria = false;
            $scope.insert = false;
            $scope.update = false;
            
            $scope.verArticulos = verArticulos;
            $scope.volver       = volver;
            

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
            
            function verArticulos(index) {
                $scope.datSel = {};
                $scope.datSel = $scope.dat[index];
                $scope.datSel.index = index;
                console.log('datos en familia:' + $scope.datSel);
                console.log($scope.datSel.codigo);
                window.location="#!/articulosVer/" + $scope.datSel.codigo; 
            };

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


            function volver() {
                window.history.back();
//                $scope.datSel = {};
//                $scope.showCategoria = false;
//                mostrarDatos();
            };

            
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

                    $scope.dat[$scope.index] = $scope.datSel;
                    $scope.showCategoria = false;
                    $scope.insert = false;
                };
            }
        }
    });

})();
