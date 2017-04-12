		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		// Define the `Menu de inicio` module
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		angular.module('opinionesListado', []);
		angular.module('opinionesListado')
		    .component('opinionesListado', {
		        templateUrl: 'app/partials/opiniones/opiniones-listado.template.html',
		        controller: function OpinionesListadoController($scope, $routeParams, $location) {
		            var auxTxt = 'Listado de Opiniones'
		            $scope.texto = auxTxt;

		            this.volver = function() {
		                $location.path('/mesasListado');
		            }

		        }

		    });