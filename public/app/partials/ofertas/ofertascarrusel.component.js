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
                $http({
                    method: 'GET',
                    url: auxRuta
                }).then( function( response ) {
                    $scope.dat = response.data;
                }, function (error) {
                    console.log('Error: ' + error);
                });
            
            }
        }
    });

})();