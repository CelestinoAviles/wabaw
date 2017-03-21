		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		// Define the `Menu de inicio` module
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		angular.module('ticketLineaEstado')
		    .component('ticketLineaEstado', {
		        templateUrl: 'tickets/ticket-linea-estado.template.html',
		        controller: function ticketLineaEstadoController($scope, $routeParams, $location) {
		            var auxTxt = 'Listado de '
		                //   alert('Entro en ' + auxTxt);
		            $scope.texto = auxTxt;

		            this.volver = function() {
		                $location.path('/mesasListado');
		            }

		        }

		    });