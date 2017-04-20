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
                $http.get(auxRuta)
                    .success((data) => {
                    $scope.dat = data;
                })
                .error((error) => {
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
                    $scope.insert = false;
                };
            }
        }
    });

})();
