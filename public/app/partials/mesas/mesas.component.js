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
            $http.get('app/partials/mesas/mesas.json')
                .success(function(data) {
                    $scope.dat = data;
                })
                .error(function(data) {
                    alert("error");
                });
            mostrarDatos();

            //            $scope.entity = {}

            function mostrarDatos() {
                $scope.dat = [];
                $http.get('/mesas/api/v1/mesas')
                    .success((data) => {
                    $scope.dat = data;
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
                //                $scope.entity = $scope.mesas[index];
                //                $scope.entity.index = index;
                $scope.ver(index);
                $scope.update = true;
            }

        
            $scope.delete = function(index) {
                var auxCodigo = $scope.dat[index].codigo;
                $http.delete('mesas/api/v1/mesas/' + auxCodigo)
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
                    
                    $http.post('/mesas/api/v1/mesas', $scope.datSel)
                        .success((data) => {
                        $scope.dat = data;
                    })
                        .error((error) => {
                        console.log('Error: ' + error);
                    });
                }
                 else {
                     $http.put('/mesas/api/v1/mesas/' + $scope.datSel.codigo, $scope.datSel)
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
