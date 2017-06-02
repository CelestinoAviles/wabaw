//
//
//
(function() {

angular.module('preferencias')
    .component('preferencias', {
        templateUrl: 'app/partials/' + 'dispositivopreferencias' + '/' + 'preferencias' + '.template.html',
        controller: function EntidadController($scope, $http, $routeParams, $location, $translate, preferencias_factory) {

            var auxRuta = '/preferencias/api/v1/preferencias';
            var auxEntidad = 'preferencias';
            
            $scope.rate = 1;
            $scope.max = 5;
            $scope.texto = auxEntidad.toUpperCase();;
            $scope.dat = [];
            $scope.datSel = [];
            $scope.showCategoria = false;
            $scope.insert = false;
            $scope.update = true;
            $scope.showPreferencias = true ;
            $scope.changeLanguage = preferencias_factory.changeLanguage;
            
            mostrarDatos();

    
            function mostrarDatos() {

                var dispositivo = localStorage.getItem("dispositivo");
                var preferencias = JSON.parse(dispositivo);
                console.log(preferencias); //true
                $scope.datSel = preferencias;

                
            }

            $scope.ver = function(index) {

                var dispositivo = localStorage.getItem("dispositivo");
                var preferencias = JSON.parse(dispositivo);
                console.log(preferencias); //true
                $scope.datSel = preferencias;
                
            }

            $scope.volver = function() {
                $scope.datSel = {};
                $scope.showCategoria = false;
                $scope.showPreferencias = false;
                mostrarDatos();
                window.location = "#!/";    
            }


            $scope.grabar = function() {

                console.log('idioma:'+ $scope.datSel.idioma_dispositivo);
                
                preferencias_factory.changeLanguage($scope.datSel.idioma_dispositivo);

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
                $scope.showPreferencias = false;
                window.location = "#!/";    
            }
        }
    });
    
})();
