		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		// Define the `Menu de inicio` module
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
(function() {
    'use strict';

    angular.module('inicio')
		    .component('inicio', {
		        templateUrl: 'app/partials/inicio/inicio.template.html',
		        controller: function InicioController($scope, $routeParams, $location, servicio) {
                    alert('Ole');
                    $scope.servicio = servicio;
                    alert($scope.servicio);
                    console.log($scope.servicio);
                    console.log(servicio.listaCompartida);
                    console.log(servicio.datosCompartidos);
                    servicio.datosCompartidos='uno dos tres';

                    console.log(servicio.datosCompartidos);
                    
                    var dispositivo = localStorage.getItem("dispositivo");
                    var preferencias = JSON.parse(dispositivo);
                    console.log('inicio: ' + preferencias);
                    $scope.dispositivo = preferencias.nombre_dispositivo;
                    $scope.espacio     = preferencias.codigo_espacio;
                    $scope.idioma      = preferencias.idioma_dispositivo;
                    
//                    srvGeneral.miFuncion('Hola');
//                    aux = srvGeneral.calculoIVA(10, 12);
//                    srvGeneral.miFuncion(aux);
//                    function glbVar
//                    srvGeneral.inicializarVariables(glbVar);
//                    srvGeneral.miFuncion(glbVar.numDecimales);
                    

		        }
		    });

})();