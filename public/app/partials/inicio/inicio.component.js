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
		        controller: function InicioController($translate, $scope, $routeParams, $location, servicio) {
                    

//                    CargarFacebook();
                    
                    $scope.servicio = servicio;
//                    alert($scope.servicio);
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
                    $translate.use($scope.idioma);
                    
//                    srvGeneral.miFuncion('Hola');
//                    aux = srvGeneral.calculoIVA(10, 12);
//                    srvGeneral.miFuncion(aux);
//                    function glbVar
//                    srvGeneral.inicializarVariables(glbVar);
//                    srvGeneral.miFuncion(glbVar.numDecimales);

                    function compartirFacebook()  
                    {
                        FB.ui({
                            method: 'share',
                            display: 'popup',
                            href: 'https://developers.facebook.com/docs/',
                        }, function(response){});
                    };
                    
          function CargarFacebook() {
                window.fbAsyncInit = function() {
                    FB.init({
                        appId      : '1303323409750155',
                        xfbml      : true,
                        version    : 'v2.8'
                    });
                    FB.ui({
                        method: 'share',
                        display: 'popup',
                        href: 'https://developers.facebook.com/docs/',
                    }, function(response){});
                        FB.AppEvents.logPageView();
                };

                (function(d, s, id){
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            };
  
		        }
		    });

})();