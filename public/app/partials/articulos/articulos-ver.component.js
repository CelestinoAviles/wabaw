//---------------------------------------------------------//
// modulo **** ARTICULOS *****
//---------------------------------------------------------//
(function() {

angular.module('articulos')
    .component('articulosVer', {
        templateUrl: 'app/partials/articulos/articulos-ver.template.html',
        controller: function EntidadController($scope, $http, $routeParams, $location) {

            this.codigoFamilia = $routeParams.id;
            
            var auxEntidad = 'articulos';
            var auxRuta = '/articulos/api/v1/articulos-ver';
            console.log(auxEntidad);

            $scope.texto = auxEntidad.toUpperCase();;
            $scope.dat = [];
            $scope.datSel = [];
            $scope.showCategoria = false;
            $scope.insert = false;
            $scope.update = false;

            $scope.volver = volver;
            $scope.verArticulo = verArticulo;

            
            
            console.log('Familia: ' + this.codigoFamilia);

            mostrarDatos(this.codigoFamilia);

            function mostrarDatos(auxCodFam) {
            console.log('Familia 1: ' + this.codigoFamilia)
            console.log('Familia 2: ' + auxCodFam);
                $scope.dat = [];
                $http.get('/articulos/api/v1/articulos-ver/' + auxCodFam)
                    .success((data) => {
                    $scope.dat = data;
                    console.log('entro en data');
                    console.log($scope.dat);
                    console.log('entro en dat');
                    console.log(data);
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
            }
            
            function verArticulo(index) {
                console.log('verarticulo');
                $scope.datSel = {};
                $scope.datSel = $scope.dat[index];
//                $scope.datSel.index = index;
                console.log($scope.datSel);
//                window.location="#!/articuloDetalle/" + $scope.datSel.codigo_articulo; 
                window.location="#!/articuloDetalle/" + $scope.datSel.codigo; 
            };

            
            function volver() {
                window.history.back();
//                $scope.datSel = {};
//                $scope.showCategoria = false;
//                mostrarDatos();
            };

//            $scope.volver = function() {
//                $scope.datSel = {};
//                $scope.showCategoria = false;
//                mostrarDatos();
//            }

        }
    });
})();
