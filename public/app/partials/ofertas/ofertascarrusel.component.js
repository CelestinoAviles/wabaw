//---------------------------------------------------------//
// modulo **** OFERTAS. CARRUSEL *****
//---------------------------------------------------------//
(function() {
angular.module('ofertas')
    .component('ofertascarrusel', {
        templateUrl: 'app/partials/ofertas/ofertascarrusel.template.html',
        controller: function ofertasCarruselController($scope, $http, $routeParams, $location) {

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
                $http.get(auxRuta)
                    .success((data) => {
                    $scope.dat = data;
                })
                .error((error) => {
                    console.log('Error: ' + error);
                });
            
            }
        }
    });

})();