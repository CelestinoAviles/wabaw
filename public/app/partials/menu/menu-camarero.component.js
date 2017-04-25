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
		        controller: function MenuCamareroController($scope, $routeParams, $location) {

                    $scope.login_ok = false;
                    $scope.login = "";
                    $scope.password = "";
                    
                    $scope.cancelar = cancelar;
                    $scope.validar = validar;
                    
                    function cancelar() {
                        $scope.login_ok = false;
                        window.location = "/#!inicio";
                    };

                    function validar() {
                        console.log($scope.login);
                        console.log($scope.password);
                        $scope.login_ok = true;
                    };


                }
		    });
