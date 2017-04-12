//---------------------------------------------------------//
// modulo **** GENERAL *****
//---------------------------------------------------------//
(function() {
    
angular.module('general')
.factory("servicio", servicio);

function servicio () {
	var ret = function(){}
//  Extraido de 
//    http://blog.marcnuri.com/angularjs-compartir-datos-entre-controladores-empleando-servicios/
//  Permite compartir y modificar datos entre componentes inyectando 'servicio' en el controlador.    
    ret.datosCompartidos = "Valor inicial";
    ret.listaCompartida =["Elemento 1"];
    
    ret.anadirElemento = function(nuevoElemento){
        ret.listaCompartida.push(nuevoElemento);
    }

    ret.limpiarLista = function(){
        ret.listaCompartida = [];
    }
    
    ret.calculoIVA = function( auxNumero ) {
        return auxNumero * 121 / 100;
    }
    
    ret.abrirVentana = function(url) {
        window.open(url, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=400, height=400");
    }
    
  return ret;
};

})();
