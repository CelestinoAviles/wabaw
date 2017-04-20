//---------------------------------------------------------//
// modulo **** ARTICULOS *****
//---------------------------------------------------------//
( function() {
angular.module('articulosimagenes')
    .component('articuloImagenes', {
        templateUrl: 'app/partials/' + 'articulosimagenes' + '/' + 'articulo-imagenes' + '.template.html',
        controller: function EntidadController($scope, $http, $routeParams, $location, srvGeneral) {

            var auxRuta = '/articulosimagenes/api/v1/articulosimagenes';
            var auxEntidad = 'articulosimagenes';

            this.codigoArticulo = $routeParams.id;
            
            $scope.rate = 1;
            $scope.max = 5;
            $scope.texto = auxEntidad.toUpperCase();;
            $scope.dat = [];
            $scope.datSel = [];
            $scope.showCategoria = false;
            $scope.insert = false;
            $scope.update = false;
            $scope.seleccionarImagen = seleccionarImagen;
            $scope.volver = volver;
            console.log('1');
            

            mostrarDatos(this.codigoArticulo);

            function mostrarDatos(auxPrm) {
                $scope.dat = [];
                $http.get( auxRuta + '/' + auxPrm )
                    .success((data) => {
                    $scope.dat = data;
                    console.log($scope.dat);
                    $scope.imagenSeleccionada = $scope.dat[0].url;
                })
                .error((error) => {
                    console.log('Error: ' + error);
                });
            
            };

            function seleccionarImagen(auxPrm) {
                $scope.imagenSeleccionada = $scope.dat[auxPrm].url;
                console.log('selecciono imagen');
                console.log($scope.imagenSeleccionada);
            };
            
            $scope.ver = function(index) {
                $scope.datSel = {};
                $scope.datSel = $scope.dat[index];
                $scope.datSel.index = index;
                $scope.showCategoria = true;
                $scope.insert = false;
                $scope.upate = false;
            }

    
            function volver() {
                window.history.back();
            };

        }
    });
})();
