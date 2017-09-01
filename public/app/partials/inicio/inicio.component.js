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
                    
                    
                    this.hero = {
                name: 'Spawn'
            };
            this.empresa = "eeee";
            this.pie = "pieeee";
                    $scope.empresa ="wwww";

                    $scope.servicio = servicio;
                    console.log($scope.servicio);
                    console.log(servicio.listaCompartida);
                    console.log(servicio.datosCompartidos);
                    servicio.datosCompartidos='uno dos tres';

                    console.log(servicio.datosCompartidos);
                    
                    var dispositivo = localStorage.getItem("dispositivo");
                    var preferencias = JSON.parse(dispositivo);
                    
                    if ( preferencias == null ) {
                        alert('Este dispositivo no está asignado a ninguna mesa. Redireccionando...');
                        window.location = "#!/dispositivoByod";    
                    } else {
  
                    console.log(preferencias);
                    $scope.dispositivo = preferencias.codigo_dispositivo;
                    $scope.mesa        = preferencias.codigo_mesa;
                    $scope.idioma      = preferencias.idioma_dispositivo;
                    $translate.use($scope.idioma);
                    };
                    
//                    if ( $scope.dispositivo = null ) {
//                        alert('Este dispositivo no está asignado a ninguna mesa. Redireccionando...');
//                        window.location = "#!/dispositivoByod";    
//                    } else {
//                        alert('Bienvenido');
//                    };
                    
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