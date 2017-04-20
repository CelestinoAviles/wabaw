//---------------------------------------------------------//
// modulo **** ARTICULO OPINIONES *****
//---------------------------------------------------------//
(function(){

angular.module('articulosopiniones')
    .component('articuloOpiniones', {
        templateUrl: 'app/partials/' + 'articulosopiniones' + '/' + 'articulo-opiniones' + '.template.html',
        controller: function EntidadController($scope, $http, $routeParams, $location) {

            var codArticulo = $routeParams.id;
            console.log(codArticulo);
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

            cargarDatos(codArticulo);

            function cargarDatos(auxPrm) {
                $scope.dat = [];
                $http.get( auxRuta + '/' + auxPrm )
                    .success((data) => {
                    $scope.dat = data;
                    console.log($scope.dat);
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

            
            $scope.volver = function() {
                $scope.datSel = {};
                $scope.showCategoria = false;
                mostrarDatos();
            }


            $scope.valoraciones=[
                { id:1, valor:1 },
                { id:2, valor:2 },
                { id:3, valor:3 },
                { id:4, valor:4 },
                { id:5, valor:5 }
                ];
            $scope.miValorSeleccionado= null;
            
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
                     $http.put(auxRuta + '/' + $scope.datSel.id, $scope.datSel)
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