//---------------------------------------------------------//
// modulo **** ARTICULOS DETALLE *****
//---------------------------------------------------------//
( function (){
    
angular.module('articulos')
    .component('artDetail', {
//        templateUrl: 'app/partials/articulos/art-detail.template.html',
        template: 'TBD: Detail view for <span>{{$ctrl.phoneId}} == {{$ctrl.cuenta}} ==  {{$ctrl.familia}}</span>',
        controller: function EntidadController($scope, $http, $routeParams, $location) {

            this.phoneId = $routeParams.Id;
            this.cuenta = $routeParams.cuenta;
            this.familia = $routeParams.familia;

            var auxEntidad = 'articulos';
            
            function mostrarDatos() {
                $scope.dat = [];
                
                $http({
                    method: 'GET',
                    url: '/articulos/api/v1/articulos'
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
        },
  bindings: {
    entidad: "=",
    numero: "@"
  }
});

    })();