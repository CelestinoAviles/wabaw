//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
// Define the `Menu de inicio` module
//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
angular.module('mesas')
    .component('mesas', {
        templateUrl: 'app/partials/mesas/mesas.template.html',
        controller: function MesasController($scope, $http, $routeParams, $location) {

            $scope.texto = "Mesas";
            $scope.dat = [];
            $scope.datSel = [];
            $scope.showCategoria = false;
            $scope.insert = false;
            $scope.update = false;
            console.log('1');

            $scope.mesas = [];
            console.log('12');
            $http.get('app/partials/mesas/mesas.json')
                .success(function(data) {
                    console.log(data);
                    $scope.dat = data;
                })
                .error(function(data) {
                    alert("error");
                });
            console.log('1234');

            //            $scope.entity = {}

            function mostrarDatos() {
                console.log('entro en mostrar datos');
                $scope.dat = [];
                $http.get('app/partials/mesas/mesas.json')
                    .success(function(data) {
                        console.log(data);
                        $scope.dat = data;
                    })
                    .error(function(data) {
                        alert("error");
                    });
            }

            $scope.ver = function(index) {
                console.log('entro en ver');
                $scope.datSel = {};
                $scope.datSel = $scope.dat[index];
                $scope.datSel.index = index;
                $scope.showCategoria = true;
                $scope.insert = false;
            }

            $scope.edit = function(index) {
                //                $scope.entity = $scope.mesas[index];
                //                $scope.entity.index = index;
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

            //            $scope.save = function(index) {
            //                $scope.mesas[index].editable = false;
            //            }

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