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
            
            cargarDatos(codArticulo);

            function cargarDatos(auxPrm) {
                $scope.dat = [];
                
                $http({
                    method: 'GET',
                    url: auxRuta + '/' + auxPrm
                }).then( function( response ) {
                    $scope.dat = response.data;
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
})();