		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		// Define the `Menu de inicio` module
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		angular.module('inicio')
		    .component('inicio', {
		        templateUrl: 'app/partials/inicio/inicio.template.html',
		        controller: function InicioController($routeParams, $location) {
		            alert('Entro en Inicio');
		        }
		    });

			