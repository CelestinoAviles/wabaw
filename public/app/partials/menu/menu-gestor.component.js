		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		// Define the `Menu de inicio` module
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		angular.module('menuGestor')
		    .component('menuGestor', {
		        templateUrl: 'app/partials/menu/menu-gestor.template.html',
		        controller: function MenuController($scope, $routeParams, $location) {

                    $scope.cancelar = cancelar;
                    $scope.validar = validar;
                    console.log($scope.login_ok);
                    
                    if ( $scope.login_ok === undefined ) {
                        $scope.login_ok = false;
                    };
                        
                    console.log($scope.login_ok);
//                    $scope.login_ok = false;
                    $scope.login = "";
                    $scope.password = "";
                    
                    
                    function cancelar() {
                        $scope.login_ok = false;
                        window.location = "/#!inicio";
                    };

                    function validar() {
                        console.log($scope.login);
                        console.log($scope.password);
                        if ($scope.login == $scope.password) {
                            $scope.login_ok = true;
                        };
                    };

                
		        }
		    });
