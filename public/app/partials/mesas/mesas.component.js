//---------------------------------------------------------//
// modulo **** MESAS *****
//---------------------------------------------------------//
angular.module('mesas')
    .component('mesas', {
        templateUrl: 'app/partials/mesas/mesas.template.html',
        controller: function MesasController($scope, $http, $routeParams, $location, servicio, srvGeneral) {

            console.log('cambio lo de servicio');
            console.log(servicio.datosCompartidos);
            servicio.datosCompartidos = 'cuatro cinco seis';
            console.log(servicio.datosCompartidos);
            console.log(servicio.calculoIVA(100));
            
//            srvGeneral.alerta('Mensaje con un servicio dado de alta en servicios generales');
            console.log(srvGeneral.calculoIVA(10, 20));
            

            $scope.texto = "Mesas";
            $scope.dat = [];
            $scope.datSel = [];
            $scope.showCategoria = false;
            $scope.insert = false;
            $scope.update = false;

            $scope.mesas = [];
            
            $scope.nomTipos = [{
                id: 'B',
                nomTipo: 'Barra'
            }, {
                id: 'S',
                nomTipo: 'Salón'
            }, {
                id: 'T',
                nomTipo: 'Terraza'
            }];
            

            mostrarDatos();

            function mostrarDatos() {
                $scope.dat = [];
                $http({
                    method: 'GET',
                    url: '/mesas/api/v1/mesas'
                }).then( function( response ) {
                    $scope.dat = response.data;
                }, function (error) {
                    console.log('Error: ' + error);
                });

            }

            $scope.Salir = function () {
                window.location = '/#!/menuGestor';
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
                //                $scope.entity = $scope.mesas[index];
                //                $scope.entity.index = index;
                $scope.ver(index);
                $scope.update = true;

                $http({
                    method: 'GET',
                    url: '/estados/api/v1/estados'
                }).then( function( response ) {
                    $scope.estados = response.data;
                }, function (error) {
                    console.log('Error: ' + error);
                });
                
                
            }

        
            $scope.delete = function(index) {
                var auxCodigo = $scope.dat[index].codigo;
                $http({
                    method: 'DELETE',
                    url: 'mesas/api/v1/mesas/' + auxCodigo
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
                        url: '/mesas/api/v1/mesas', 
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
                        url: '/mesas/api/v1/mesas/' + $scope.datSel.codigo,
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
