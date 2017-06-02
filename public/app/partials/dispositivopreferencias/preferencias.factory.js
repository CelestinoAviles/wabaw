//---------------------------------------------------------//
// modulo **** GENERAL *****
//---------------------------------------------------------//
(function() {
    
angular.module('preferencias')
.factory("preferencias_factory", preferencias);
      
function preferencias ($translate) {
	var ret = function(){}
//  Extraido de 
//    http://blog.marcnuri.com/angularjs-compartir-datos-entre-controladores-empleando-servicios/
//  Permite compartir y modificar datos entre componentes inyectando 'servicio' en el controlador.    
    
    ret.verLogin = function(){
        console.log(ret.login);
        if (typeof ret.login == "undefined") {
            ret.login = null;
        console.log(01);
        } else {
            ret.login = ret.login;
        console.log(11);
        };
        return ret.login;

    };
    
    ret.guardarLogin = function(nuevoLogin){
        ret.login = nuevoLogin;
    };

    ret.limpiarLogin = function(){
        ret.login = null;
        console.log('limpio login');
        return ret.login;
    };

    ret.changeLanguage = function (langKey) {
        $translate.use(langKey);
        $translate.fallbackLanguage(['es', 'en', 'fr']);
    };

    
  return ret;
};

})();
