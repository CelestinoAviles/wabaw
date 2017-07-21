//---------------------------------------------------------//
// Componente  **** RRSS Redes Sociales *****
//---------------------------------------------------------//

(function() {

angular.module('rrss')
    .component('rrss', {
        templateUrl: 'app/partials/rrss/rrss.template.html',
        controller: function RrssController($scope, $http, $routeParams, $location) {

            console.log('1 ' + this.parametro + ' 1');
            
            $scope.verTwitterEmpresa = false;

            $scope.textoTwitter = "Un sitio estupendo para tomar cualquier cosanooo";
            $scope.urlTwitter = "http://www.pensionsegura.es/index.php?section=catalogo&idioma=es"
            if (this.parametro == "empresa") {
                $scope.verTwitterEmpresa = true;
                $scope.textoTwitter = "";
                $scope.urlTwitter = "https://twitter.com/river97";
                $scope.tagTwitter = "HeladeriaAlfonso, PensionSegura"
            };
            if (this.parametro == "general") {
                $scope.textoTwitter = "Un sitio estupendo para tomar cualquier cosa";
                $scope.urlTwitter = "http://www.pensionsegura.es/index.php?section=catalogo&idioma=es";
                $scope.tagTwitter = "HeladeriaAlfonso, PensionSegura"
            };
            if (this.parametro == "pie") {
                $scope.textoTwitter = "Un sitio estupendo para relajarte";
                $scope.urlTwitter = "http://www.pensionsegura.es/"
                $scope.tagTwitter = "HeladeriaAlfonso, PensionSegura"
            };
            if (this.parametro == "producto") {
                $scope.textoTwitter = "Es interesante probar este producto";
                $scope.urlTwitter = "http://www.pensionsegura.es/"
                $scope.tagTwitter = "HeladeriaAlfonso"
            };

            $scope.texto = "Redes Sociales";
            $scope.dat = [];
            $scope.datSel = [];
            $scope.showCategoria = false;
            $scope.insert = false;
            $scope.update = false;

            $scope.empleados = [];
            mostrarDatos();

            function mostrarDatos() {
                $scope.dat = [];
                
                $http({
                    method: 'GET',
                    url: '/empleados/api/v1/empleados'
                }).then( function( response ) {
                    $scope.dat = response.data;
                }, function (error) {
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

            $scope.edit = function(index) {
                $scope.ver(index);
                $scope.update = true;
            }

        
            $scope.delete = function(index) {
                var auxId = $scope.dat[index].codigo;
                $http({
                    method: 'DELETE',
                    url: 'empleados/api/v1/empleados/' + auxId
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

            
            $scope.grabar = function(index) {
                if ($scope.insert) {
                    $scope.showCategoria = false;
                    $scope.insert = false;
                    $http({
                        method: 'POST',
                        url: '/empleados/api/v1/empleados', 
                        data: $scope.datSel
                    }).then( function( response ) {
                        $scope.dat = response.data;
                    }, function (error) {
                        console.log('Error: ' + error);
                    });
                
                }
                else {
                    var auxId = $scope.datSel.codigo;
                    console.log($scope.datSel);
                    $http({
                        method: 'PUT',
                        url: '/empleados/api/v1/empleados/' + auxId, 
                        data: $scope.datSel
                    }).then( function( response ) {
                        $scope.datSel = {};
                    }, function (error) {
                        console.log('Error: ' + error);
                    });

                    $scope.dat[$scope.index] = $scope.datSel;
                    $scope.showCategoria = false;
                    $scope.insert = false;
                };
            }
        },
    bindings: {
        parametro: '@'
    }
    });

})();
