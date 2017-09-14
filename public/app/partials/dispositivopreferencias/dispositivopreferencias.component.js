//
//
//
(function() {

angular.module('dispositivopreferencias')
    .component('dispositivopreferencias', {
        templateUrl: 'app/partials/' + 'dispositivopreferencias' + '/' + 'dispositivopreferencias' + '.template.html',
        controller: function EntidadController($scope, $http, $routeParams, $location, $translate, preferencias_factory ) {

            var auxRuta = '/dispositivopreferencias/api/v1/dispositivopreferencias';
            var auxEntidad = 'Dispositivos. Asignar a mesas y espacios';

            $scope.rate = 1;
            $scope.max = 5;
            $scope.texto = auxEntidad.toUpperCase();;
            $scope.dat = [];
            $scope.datSel = [];
            $scope.showCategoria = false;
            $scope.insert = false;
            $scope.update = false;
            $scope.changeLanguage = preferencias_factory.changeLanguage;
    
            mostrarDatos();

            function mostrarDatos()
            {
                $scope.dat = [];

                $http({
                    method: 'GET',
                    url: auxRuta
                }).then( function( response ) {
                    $scope.dat = response.data;
                }, function (error) {
                    console.log('Error: ' + error);
                });

                $http({
                    method: 'GET',
                    url: '/dispositivos/api/v1/dispositivos'
                }).then( function( response ) {
                    $scope.dispositivos = response.data;
                }, function (error) {
                    console.log('Error: ' + error);
                });

                
                $http({
                    method: 'GET',
                    url: '/mesas/api/v1/mesas'
                }).then( function( response ) {
                    $scope.mesas = response.data;
                }, function (error) {
                    console.log('Error: ' + error);
                });
                
            $scope.idiomas = [{
                id: 'EN',
                nom: 'Inglés'
            }, {
                id: 'ES',
                nom: 'Español'
            }];

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
                    codigo_mesa       : $scope.datSel.codigo_mesa,
                };

                
                // Guardamos directo el JSON al localStorage:

                var dispositivoAGuardar = JSON.stringify(dispositivo);

                localStorage.setItem("dispositivo", dispositivoAGuardar );
                var dispositivoGuardado = localStorage.getItem("dispositivo");

                $scope.preferencias = dispositivo;
                
                alert('ATENCION. Se ha grabado la información en este dispositivo');
                
            }

            $scope.delete = function(index) {
                var auxId = $scope.dat[index].codigo_dispositivo;
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

                console.log('idioma: '+ $scope.datSel.idioma_dispositivo);
                
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
                        url: auxRuta + '/' + $scope.datSel.codigo_dispositivo, 
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
                
                var dispositivo = {
                    codigo_dispositivo: $scope.datSel.codigo_dispositivo,
                    nombre_dispositivo: $scope.datSel.nombre_dispositivo,
                    idioma_dispositivo: $scope.datSel.idioma_dispositivo,
                    codigo_mesa       : $scope.datSel.codigo_mesa
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
