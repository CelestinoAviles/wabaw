//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
angular.module('empleados', []);

angular.module('empleados')
    .component('empleados', {
        templateUrl: 'app/partials/empleados/empleados.template.html',
        controller: function EmmpleadosController($scope, $http, $location) {


            
            
            
            $scope.texto = "Empleados";
            $scope.dat = [];
            $scope.datSel = [];
            $scope.showCategoria = false;
            $scope.insert = false;
            $scope.update = false;
            console.log('1');

            $scope.empleados = [];
            mostrarDatos();
            console.log('1234');
            cargarDatos();


            
            
            function mostrarDatos() {
                console.log('entro en mostrar datos');
                $scope.dat = [];
                $http.get('app/partials/empleados/empleados.json')
                    .success(function(data) {
                        console.log(data);
                        $scope.dat = data;
                    })
                    .error(function(data) {
                        alert("error");
                    });
            }

            function cargarDatos() {
                $scope.dat = [];
                $http.get('app/partials/empleados/empleados.json')
                    .success(function(data) {
                        console.log(data);
                        $scope.dat = data;
                        localStorage.setItem('empleados', JSON.stringify($scope.dat));
                        var restoredEmpleados = JSON.parse(localStorage.getItem('empleados'));
                        console.log('---');
                        console.log(restoredEmpleados);
                    })
                    .error(function(data) {
                        alert("error");
                    });
            }
            

            
            $scope.ver = function(index) {
                console.log('entro en ver');
                console.log($scope.dat);
                $scope.datSel = {};
                $scope.datSel = $scope.dat[index];
                $scope.datSel.index = index;
                $scope.showCategoria = true;
                $scope.insert = false;
            }

            $scope.edit = function(index) {
                console.log('entro en edit');
                $scope.datSel = {};
                $scope.datSel = $scope.dat[index];
                $scope.datSel.index = index;
                $scope.showCategoria = true;
                $scope.update = true;
            }

            $scope.delete = function(index) {
                $scope.dat.splice(index, 1);
            }

            $scope.newItem = function() {
                console.log('entro en newItem');
                $scope.datSel = {};
                $scope.showCategoria = true;
                $scope.insert = true;
            }

            $scope.volver = function() {
                console.log('entro en volver');
                $scope.datSel = {};
                $scope.showCategoria = false;
                mostrarDatos();
            }

            $scope.grabar = function() {
                console.log('entro en grabar');
                if ($scope.insert) {
                    $scope.dat.push($scope.datSel);
                    console.log('grabo');
                    $scope.showCategoria = false;
                    $scope.insert = false;
                    console.log('salgo de grabar');
                } else {
                    console.log($scope.datSel.nombreMesa);
                    console.log($scope.dat);

                    $scope.dat[$scope.index] = $scope.datSel;
                    $scope.showCategoria = false;
                    $scope.insert = false;
                };
            }

        }
    });