		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		// Define the `Menu de inicio` module
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		angular.module('menuCocinero')
		    .component('menuCocinero', {
		        templateUrl: 'app/partials/menu/menu-cocinero.template.html',
		        controller: function MenuCocineroController($scope, $routeParams, $location, cocinero) {

                    $scope.login = cocinero.verLogin();
                    if ($scope.login == null) {
                        $scope.login_ok = false;
                        $scope.login = "";
                        $scope.password = "";
                    } else {
                        $scope.login_ok = true;
            
                    };
                    console.log('-' + $scope.login + '-');
                    
                    $scope.cancelar = cancelar;
                    $scope.validar = validar;
                    $scope.cerrarSesion = cerrarSesion;

                    function cerrarSesion() {
                        $scope.login_ok = false;
                        $scope.login = cocinero.limpiarLogin();
                        window.location = "/#!/menuCocinero";
                    };

                    
                    function cancelar() {
                        $scope.login_ok = false;
                        window.location = "/#!inicio";
                    };

                    function validar() {
                        console.log($scope.login);
                        console.log($scope.password);
                        $scope.login_ok = true;
                        cocinero.guardarLogin($scope.login);
                    };


                }
		    });
