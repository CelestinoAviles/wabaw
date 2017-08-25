//---------------------------------------------------------//
// modulo **** LLAMADA *****
//---------------------------------------------------------//

angular.module('llamada')
    .component('llamada', {
    templateUrl: 'app/partials/llamada/llamada.template.html',
    controller: function EntidadController($scope, $http, $routeParams, $location) {
        
        var auxEntidad = 'llamada';
        var auxRuta = '/llamada/api/v1/llamada';
        console.log('1 ' + auxEntidad);
            

        $scope.texto = auxEntidad.toUpperCase();;
        $scope.dat = [];
        $scope.datSel = [];
        $scope.showCategoria = false;
        $scope.insert = false;
        $scope.update = false;

        var dispositivo = localStorage.getItem("dispositivo");
        var preferencias = JSON.parse(dispositivo);
        console.log('inicio: ' + preferencias);
        $scope.dispositivo = preferencias.nombre_dispositivo;
        $scope.espacio     = preferencias.codigo_mesa;
        $scope.idioma      = preferencias.idioma_dispositivo;

        $scope.nombre="Lorenzo"
          
        mostrarDatos();

        function volver() {
//                    window.location.href="/#!/mesaTicket0";
            window.location.href="/#!/inicio";
            document.location.href = document.location.href;
        };

   
        $scope.$watch("nombre",function(newValue,oldValue) {
     
            if (newValue===oldValue) {
                return;
            }
     
            alert("El nuevo Nombre es:" + newValue);
        });
        
        
        function mostrarDatos() {

            $scope.dat = [];
            $http({
                method: 'GET',
                url: '/llamada/api/v1/llamada'
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

        $scope.llamar = function(prm) {
            $scope.nombre="Juan";
            alert($scope.nombre);
            alert('Ha solicitado : ' + prm.toUpperCase() +`. En breve le atenderemos.`);
            $scope.datSel = { "llamada": prm.toUpperCase(),
                             "codigo" : $scope.espacio
                            };
                    
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

//            volver();
        };

        $scope.grabar = function() {
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
                    url: auxRuta + '/' + $scope.datSel.codigo, 
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
        }
    }
});
