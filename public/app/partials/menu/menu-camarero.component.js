		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		// Define the `Menu de inicio` module
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		angular.module('menuCamarero')
		    .component('menuCamarero', {
		        templateUrl: 'app/partials/menu/menu-camarero.template.html',
		        controller: function MenuCamareroController($scope, $routeParams, $location, camarero) {

                    $scope.login = camarero.verLogin();
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
                        $scope.login = camarero.limpiarLogin();
                        window.location = "/#!/menuCamarero";
                    };

                    
                    function cancelar() {
                        $scope.login_ok = false;
                        window.location = "/#!inicio";
                    };

                    function validar() {
                        console.log($scope.login);
                        console.log($scope.password);
                        $scope.login_ok = true;
                        camarero.guardarLogin($scope.login);
                    };


                }
		    });
