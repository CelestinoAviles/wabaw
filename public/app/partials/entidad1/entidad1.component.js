		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		// Define the `Menu de inicio` module
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		angular.module('entidad1')
		    .component('entidad1', {
		        templateUrl: 'app/partials/entidad1/entidad1.template.html',
		        controller: function Entidad1Controller($scope, $routeParams, $location) {
		            var auxTxt = 'Entidad 1'
		                //         alert('Entro en ' + auxTxt);
		            $scope.texto = auxTxt;

		        }

		    });