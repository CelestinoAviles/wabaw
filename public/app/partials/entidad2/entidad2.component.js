		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		// Define the `Menu de inicio` module
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		angular.module('entidad2')
		    .component('entidad2', {
		        templateUrl: 'app/partials/entidad2/entidad2.template.html',
		        controller: function Entidad2Controller($scope, $routeParams, $location) {
		            var auxTxt = 'Entidad 2'
		                // alert('Entro en ' + auxTxt);
		            $scope.texto = auxTxt;

		            this.verPantalla001 = function() {
		                $location.path('/inicio');
		            }
		            this.verPantallaCatalogo = function() {
		                $location.path('/inicio');
		            }
		            this.verPantallaNuevo = function() {
		                $location.path("/inicio");
		            }


		        }

		    });