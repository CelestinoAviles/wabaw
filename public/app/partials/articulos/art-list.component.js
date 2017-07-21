//---------------------------------------------------------//
// modulo **** ARTICULOS *****
//---------------------------------------------------------//
(function(){
    
angular.module('articulos')
    .component('artList', {
        templateUrl: 'app/partials/articulos/art-list.template.html',
        controller: function EntidadController($scope, $http, $routeParams, $location, uiGridConstants) {

            
            
            $scope.gridOptions1 = {
                enableSorting: true,
                columnDefs: [
                    { field: 'codigo' },
                    { field: 'nombre' },
                    { field: 'codigo_articulo', enableSorting: false }
                ],
                onRegisterApi: function( gridApi ) {
                    $scope.grid1Api = gridApi;
                }
            };
            
            mostrarDatos();
            
                console.log('1--2');
                console.log($scope.dat);
                console.log($scope.gridOptions1);
            
            function mostrarDatos() {
                
                $http({
                    method: 'GET',
                    url: '/articulos/api/v1/articulos'
                }).then( function( response ) {
                    $scope.dat = response.data;
                    $scope.gridOptions1.data = response.data;
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
