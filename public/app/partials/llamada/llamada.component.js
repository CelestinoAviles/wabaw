//---------------------------------------------------------//
// modulo **** LLAMADA *****
//---------------------------------------------------------//

angular.module('llamada')
    .component('llamada', {
    templateUrl: 'app/partials/llamada/llamada.template.html',
    controller: function EntidadController($scope, $http, $routeParams, $location) {
        
        var auxEntidad = 'llamada';
        var auxRuta = '/llamada/api/v1/llamada';

        $scope.texto = auxEntidad.toUpperCase();;

        var dispositivo = localStorage.getItem("dispositivo");
        var preferencias = JSON.parse(dispositivo);
        console.log('inicio: ' + preferencias);
        $scope.dispositivo = preferencias.nombre_dispositivo;
        $scope.espacio     = preferencias.codigo_mesa;
        $scope.idioma      = preferencias.idioma_dispositivo;
        $scope.volver   = volver;
        $scope.llamar   = llamar;


        
        function volver() {
            window.location.href="/#!/inicio";
            document.location.href = document.location.href;
        };

   
        function llamar(prm) {
            alert('Ha solicitado : **** ' + prm.toUpperCase() +` ****. En breve le atenderemos.`);
            $scope.datSel = { "llamada": prm.toUpperCase(),
                             "codigo" : $scope.espacio
                            };1
                    
            var auxRuta = '/mesas/api/v1/mesas/llamada';
            console.log($scope.datSel)
            $http({
                method: 'PUT',
                url: auxRuta + '/' + $scope.espacio, 
                data: $scope.datSel
            }).then( function( response ) {
                $scope.dat = response.data;
            }, function (error) {
                console.log('Error: ' + error);
            });

            volver();
        };

    }
});
