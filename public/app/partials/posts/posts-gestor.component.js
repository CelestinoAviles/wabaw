//---------------------------------------------------------//
// modulo **** OPINIONES SOBRE EL ESTABLECIMIENTO   *****
//---------------------------------------------------------//
(function() {

angular.module('posts')
    .component('postsGestor', {
        templateUrl: 'app/partials/' + 'posts' + '/' + 'posts-gestor' + '.template.html',
        controller: function EntidadController($scope, $http, $routeParams, $location, $interval) {

            var glbIntervalo = 10000;  // 10 segundos
            var auxRuta = '/posts/api/v1/posts';
            var auxEntidad = 'Gestion de opiniones sobre el Establecimiento';
            var stop;
    
            $scope.opcionCliente = false;
            $scope.rate = 1;
            $scope.max = 5;
            $scope.texto = auxEntidad.toUpperCase();;
            $scope.dat = [];
            $scope.datSel = [];
            $scope.showCategoria = false;
            $scope.insert = false;
            $scope.update = false;

            $scope.valorGeneral = {
                valores : [1, 2, 3, 4, 5],
                selected: 3
            };
            $scope.valorLimpieza = {
                valores : [1, 2, 3, 4, 5],
                selected: 3
            };
            $scope.valorServicio = {
                valores : [1, 2, 3, 4, 5],
                selected: 3
            };

            mostrarDatos();
            stop = $interval(function() {
                mostrarDatos();
            }, glbIntervalo);

            $scope.Salir = function () {
                $interval.cancel(stop);
                window.location = '/#!/menuGestor';
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

            $scope.ver = function(index) {
                $scope.datSel = {};
                $scope.datSel = $scope.dat[index];
                $scope.datSel.index = index;
                $scope.showCategoria = true;
                $scope.insert = false;
                $scope.upate = false;
                $scope.valorGeneral.selected = $scope.datSel.valor_general;
                $scope.valorLimpieza.selected = $scope.datSel.valor_limpieza;
                $scope.valorServicio.selected = $scope.datSel.valor_servicio;

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
                $scope.insert = false;
                $scope.update = false;
            }

            $scope.grabar = function() {

                $scope.datSel.valor_general =  $scope.valorGeneral.selected;
                $scope.datSel.valor_limpieza = $scope.valorLimpieza.selected;
                $scope.datSel.valor_servicio = $scope.valorServicio.selected;
                
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