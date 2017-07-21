//
//
//
(function() {

angular.module('dispositivos')
    .component('dispositivos', {
        templateUrl: 'app/partials/' + 'dispositivos' + '/' + 'dispositivos' + '.template.html',
        controller: function EntidadController($scope, $http, $routeParams, $location, $translate, uiGridConstants, preferencias_factory ) {

            var auxRuta = '/dispositivos/api/v1/dispositivos';
            var auxEntidad = 'Gestion de dispositivos del establecimiento';
            
            $scope.rate = 1;
            $scope.max = 5;
            $scope.texto = auxEntidad.toUpperCase();;
            $scope.dat = [];
            $scope.datSel = [];
            $scope.showCategoria = false;
            $scope.insert = false;
            $scope.update = false;
            $scope.changeLanguage = preferencias_factory.changeLanguage;


            $scope.gridOptions = {
                enableFiltering: true,
                onRegisterApi: function(gridApi){
                    $scope.gridApi = gridApi;
                },
                    columnDefs: [
                        { field: 'nombre', headerCellClass: $scope.highlightFilteredHeader },
                        // pre-populated search field
                        { field: 'marca', filter: {
                            term: '1',
                            type: uiGridConstants.filter.SELECT,
                            selectOptions: [ { value: '1', label: 'male' }, { value: '2', label: 'female' }, { value: '3', label: 'unknown'}, { value: '4', label: 'not stated' }, { value: '5', label: 'a really long value that extends things' } ]
                        },
                         cellFilter: 'mapGender', headerCellClass: $scope.highlightFilteredHeader },
                    ]
            };

            $scope.ubicacion = {
                'Dtto. Capital': {
                    'Libertador': ['La Vega', 'Antimano']
                },
                'Miranda': {
                    'Plaza': ['Guarenas'],
                    'Zamora': ['Guatire']
                }
            };
            
            mostrarDatos();
            cargarClases();

            function cargarClases(){
                $http({
                    method: 'GET',
                    url: '/dispositivos/api/v1/dispositivos'
                }).then( function( response ) {
                    console.log('Lista Clases de Lentes cargadas');
                    console.log(response.data);
                    $scope.clases = response.data;
                    $scope.codigo_clase_lente = response.data[0];
                    console.log($scope.codigo_clase_lente);
                }, function (error) {
                    console.log('Error: ' + error);
                });
            };
            
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
                var auxId = $scope.dat[index].codigo_dispositivo;
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
                    $scope.showCategoria = false;
                    $scope.insert = false;
                     
                    $http({
                        method: 'PUT',
                        url: auxRuta + '/' + $scope.datSel.codigo_dispositivo, 
                        data: $scope.datSel
                    }).then( function( response ) {
                        $scope.dat = response.data;
                    }, function (error) {
                        console.log('Error: ' + error);
                    });
                     

                    $scope.dat[$scope.index] = $scope.datSel;
                };
                
            }
        }
    });

    
})();
