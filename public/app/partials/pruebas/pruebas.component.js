		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		// Define the `Menu de inicio` module
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		angular.module('pruebas')
		    .component('pruebas', {
		        templateUrl: 'app/partials/pruebas/pruebas.template.html',
		        controller: function MenuController($routeParams, $location) {
		            alert('Entro en pruebas');
		        }
		    });

		//
		// function miCtrlInicio($scope) {
		//    $scope.mensaje = 'Mensaje desde el controlador';
		// }

		var myApp = angular.module('pruebas0', []);

		myApp.controller('miCtrlInicio', ['$scope', function($scope) {
		    $scope.mensaje2 = 'Hola!';
		}]);

		myApp.controller('miCtrl', ['$scope', function($scope) {
		    $scope.mensaje3 = 'Hola 33!';
		}]);

		myApp.controller('miCtrl', ['$scope', function($scope) {
		    $scope.mensaje3 = 'Hola 33!';
		}]);

		myApp.controller('CtrlPadre', ['$scope', function($scope) {
		    $scope.padre = 'Soy el padre';
		    $scope.logPadre = function() {
		        console.log($scope.padre);
		    }
		}]);

		myApp.controller('contrasenya', ['$scope', function($scope) {
		    $scope.errorMinimo = false;
		    $scope.textoAyuda = "Longitud incorrecta";
		    $scope.$watch("password", function(nuevo, anterior) {
		        if (!nuevo) { return };
		        if (nuevo.length < 6) {
		            $scope.errorMinimo = true;
		            console.log('1');
		        } else {
		            $scope.errorMinimo = false;
		            console.log('2');
		        };
		    });
		}]);


		//
		// Funciones del TODO
		//

		myApp.controller('mainController', ['$scope', '$http', function($scope, $http) {
		    $scope.formData = {};
		    $scope.todoData = {};

		    // Get all todos

		    $http.get('/todos')
		        .success((data) => {
		            $scope.todoData = data;
		            auxData = $scope.todoData;
		            alert('datos');
		            alert(auxData);
		            console.log(data);
		        })
		        .error((error) => {
		            alert('datos Error');
		            console.log('Error: ' + error);
		        });


		    // Create a new todo
		    $scope.createTodo = () => {
		        $http.post('/api/v1/todos', $scope.formData)
		            .success((data) => {
		                $scope.formData = {};
		                $scope.todoData = data;
		                console.log(data);
		            })
		            .error((error) => {
		                console.log('Error: ' + error);
		            });
		    };

		    // Delete a todo
		    $scope.deleteTodo = (todoID) => {
		        $http.delete('/api/v1/todos/' + todoID)
		            .success((data) => {
		                $scope.todoData = data;
		                console.log(data);
		            })
		            .error((data) => {
		                console.log('Error: ' + data);
		            });
		    };


		    // Update a new todo
		    $scope.updateTodo = (todoID) => {
		        $http.put('/api/v1/todos/' + todoID, $scope.formData)
		            .success((data) => {
		                $scope.formData = {};
		                $scope.todoData = data;
		                console.log(data);
		            })
		            .error((error) => {
		                console.log('Error: ' + error);
		            });
		    };

		}]);