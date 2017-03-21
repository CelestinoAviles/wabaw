		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		// Define the `Menu de inicio` module
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		angular.module('mesasListado')
		    .component('mesasListado', {
		        templateUrl: 'app/partials/mesas/mesas-listado.template.html',
		        controller: function MesasListadoController($scope, $routeParams, $location) {
		            var auxTxt = 'Listado de Mesas'
		            var auxListaMesas = [
		                { idMesa: 1, nombreMesa: "Mesa 1", totMesa: 10, sitMesa: "Ocupada", ultimaAccion: "10:00", sttMesa: "Atendida" },
		                { idMesa: 2, nombreMesa: "Mesa 2", totMesa: 8.40, sitMesa: "Libre", ultimaAccion: "10:10", sttMesa: "Libre" },
		                { idMesa: 3, nombreMesa: "Mesa 3", totMesa: 5.00, sitMesa: "Ocupada", ultimaAccion: "10:20", sttMesa: "Pagada" },
		                { idMesa: 4, nombreMesa: "Mesa 4", totMesa: 4.00, sitMesa: "Reservada", ultimaAccion: "10:40", sttMesa: "Pendiente" }
		            ];

		            $scope.texto = auxTxt;
		            $scope.mesas = auxListaMesas;

		            this.volver = function() {
		                $location.path('/mesas');
		            }

		        }

		    });