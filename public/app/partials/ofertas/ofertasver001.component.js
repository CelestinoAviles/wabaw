//---------------------------------------------------------//
// modulo **** OFERTAS *****
//---------------------------------------------------------//
(function() {
angular.module('ofertas')
    .component('ofertasver001', {
        templateUrl: 'app/partials/ofertas/ofertasver001.template.html',
        controller: function ofertasController($scope, $http, $routeParams, $location) {

            var auxEntidad = 'ofertas';
            var auxRuta = '/ofertas/api/v1/ofertas';
            console.log('1 ' + auxEntidad);
            

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
                    url: '/ofertas/api/v1/ofertas-ver'
                }).then( function( response ) {
                    $scope.dat = response.data;
                }, function (error) {
                    console.log('Error: ' + error);
                });
            }

            $scope.ver = function(index) {
                $scope.datSel = {};
                $scope.datSel = $scope.dat[index];
                console.log($scope.datSel);
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
                var auxId = $scope.dat[index].id;
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

                    $scope.dat[$scope.index] = $scope.datSel;
                    $scope.showCategoria = false;
                    $scope.insert = false;
                };
            }
        }
    });

})();