//
//
//
(function() {

angular.module('preferencias')
    .component('dispositivoByod', {
        templateUrl: 'app/partials/' + 'dispositivopreferencias' + '/' + 'dispositivo-byod' + '.template.html',
        controller: function EntidadController($scope, $http, $routeParams, $location, $window) {

            $scope.acceder = acceder;
            $scope.volver = volver;
            $scope.datSel = [];
            $scope.datSel.idioma_dispositivo= 'es';

            function volver() {
                localStorage.clear();
                alert('¡ Hasta pronto !');
                window.location = '/#!/inicio';
             };

            function acceder() {
                auxMesa = verMesa();
                console.log('---');
                console.log(auxMesa);
                console.log($scope.dat);
            };

            
            function verMesa() {
                console.log($scope.datSel.codigo_mesa);
                console.log($scope.datSel.password);
                $scope.dat = [];
                $http({
                    method: 'GET',
                    url: '/mesas/api/v1/mesas/' + $scope.datSel.codigo_mesa.trim()
                }).then( function( response ) {
                    $scope.dat = response.data[0];
                    console.log($scope.dat);
                    console.log(response.data);
                    console.log($scope.dat.clave);
                    if( $scope.dat.clave.trim() === $scope.datSel.password.trim()) {
                        alert('Correcto');
                        var dispositivo = {
                            codigo_dispositivo: '9999',
                            nombre_dispositivo: 'Móvil particular',
                            idioma_dispositivo: 'es',
                            codigo_mesa       : $scope.datSel.codigo_mesa.trim()
                        };
                        grabar( dispositivo );

                    } else {
                      alert('Incorrecto');
                        volver();
                    };
                }, function (error) {
                    console.log('Error: ' + error);
                });
                return $scope.dat;
            };

            
            
            function grabar( dispositivo ) {
                console.log('pwd');
                console.log($scope.datSel.password)
                    

                // Guardamos directo el JSON al localStorage:
                
                var dispositivoAGuardar = JSON.stringify(dispositivo);

                localStorage.setItem("dispositivo", dispositivoAGuardar );
                var dispositivoGuardado = localStorage.getItem("dispositivo");
                $scope.preferencias = dispositivo;
                $scope.showPreferencias = false;
                window.location = '/#!/inicio';
            }
        }
    });
    
})();
