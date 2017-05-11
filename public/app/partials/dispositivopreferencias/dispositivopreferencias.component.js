//
//
//
(function() {

angular.module('dispositivopreferencias')
    .component('dispositivopreferencias', {
        templateUrl: 'app/partials/' + 'dispositivopreferencias' + '/' + 'dispositivopreferencias' + '.template.html',
        controller: function EntidadController($scope, $http, $routeParams, $location) {

            var auxRuta = '/dispositivopreferencias/api/v1/dispositivopreferencias';
            var auxEntidad = 'Gestionar dispositivos y asignar a espacios';
            
            $scope.rate = 1;
            $scope.max = 5;
            $scope.texto = auxEntidad.toUpperCase();;
            $scope.dat = [];
            $scope.datSel = [];
            $scope.showCategoria = false;
            $scope.insert = false;
            $scope.update = false;

            mostrarDatos();

            function mostrarDatos() {
                $scope.dat = [];
                $http.get( auxRuta )
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

                var dispositivo = localStorage.getItem("dispositivo");
                var preferencias = JSON.parse(dispositivo);
                console.log(preferencias); //true                
                
            }

            $scope.edit = function(index) {
                $scope.ver(index);
                $scope.update = true;
            }

            $scope.asignar = function(index) {
                $scope.datSel = $scope.dat[index];
                $scope.datSel.index = index;

                var dispositivo = localStorage.getItem("dispositivo");
                var preferencias = JSON.parse(dispositivo);

                var dispositivo = {
                    codigo_dispositivo: $scope.datSel.codigo_dispositivo,
                    nombre_dispositivo: $scope.datSel.nombre_dispositivo,
                    idioma_dispositivo: $scope.datSel.idioma_dispositivo,
                    codigo_espacio    : $scope.datSel.codigo_espacio,
                };

                // Guardamos directo el JSON al localStorage:

                var dispositivoAGuardar = JSON.stringify(dispositivo);

                localStorage.setItem("dispositivo", dispositivoAGuardar );
                var dispositivoGuardado = localStorage.getItem("dispositivo");

                $scope.preferencias = dispositivo;
                
            }

            $scope.delete = function(index) {
                var auxId = $scope.dat[index].codigo_dispositivo;
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
                     $http.put(auxRuta + '/' + $scope.datSel.codigo_dispositivo, $scope.datSel)
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
                
                var dispositivo = {
                    codigo_dispositivo: $scope.datSel.codigo_dispositivo,
                    nombre_dispositivo: $scope.datSel.nombre_dispositivo,
                    idioma_dispositivo: $scope.datSel.idioma_dispositivo,
                    codigo_espacio    : $scope.datSel.codigo_espacio
                };

                // Guardamos directo el JSON al localStorage:

                var dispositivoAGuardar = JSON.stringify(dispositivo);

                localStorage.setItem("dispositivo", dispositivoAGuardar );
                var dispositivoGuardado = localStorage.getItem("dispositivo");

                $scope.preferencias = dispositivo;
            }
        }
    });

    
})();
