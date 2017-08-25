//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
// Define the Juegos module
//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
angular.module('juegos')
    .component('juegos', {
    templateUrl: 'app/partials/juegos/juegos.template.html',
    controller: function JuegosController($routeParams, $location, $scope, servicio) {
        
        $scope.texto = "Juegos";
        $scope.showNivel0 = true;
        $scope.showNivel1Solitario = false;
        $scope.showNivel1Equipos   = false;
                    
        $scope.Solitario = function () {
            $scope.showNivel0 = false;
            $scope.showNivel1Solitario = true;
            $scope.showNivel1Equipos   = false;
        };
                        
        $scope.Equipos = function () {
            $scope.showNivel0 = false;
            $scope.showNivel1Solitario = false;
            $scope.showNivel1Equipos   = true;
        };

        $scope.Volver = function () {
            $scope.showNivel0 = true;
            $scope.showNivel1Solitario = false;
            $scope.showNivel1Equipos   = false;
        };

        $scope.volverInicio = function () {
            window.location = '/#!/inicio';
        };
                        
        $scope.lanzar = function ( auxUrl ) {
            servicio.abrirVentana( auxUrl );
        };

    }
                
});
