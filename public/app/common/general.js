//---------------------------------------------------------//
// modulo **** GENERAL *****
//---------------------------------------------------------//
angular.module('general')
    .component('general', {
        templateUrl: '',
        controller: function GeneralController($scope, $http, $routeParams, $location) {

            $scope.CurrentDate = new Date();
            $scope.FechaActual = new Date();
            
            function Mensaje () {
              this.simple = function (texto) {
                  console.log(texto);
                  alert(texto);
              };
            };

            var ccc = new Mensaje();
            ccc.simple('hola 222');
            
        }
    })
 .filter('filtroSumaTotal', function() {
        return function(data, key1, key2) {
            if (typeof(data) === 'undefined' || typeof(key1) === 'undefined'|| typeof(key2) === 'undefined') {
                return 0;
            }

            var sum = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                sum += parseFloat(data[i][key1]) * parseFloat(data[i][key2]);
            }

            return sum.toFixed(2);
        };
    })
 .filter('filtroSumaClave', function() {
        return function(data, key) {
            if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
                return 0;
            }

            var sum = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                sum += parseFloat(data[i][key]);
            }

            return sum;
        };
    })
.service('srvGeneral', function() {
   // He utilizado lo de factory, funciona a mi parecer igual.
    var salida = function() {};
    
    this.inicializarVariables = function(glb) {
        glb.numDecimales = 2;
        glb.localidad = "Murcia";
    };
    
    salida.alerta = function(parametro) {
        alert("******" + parametro + " *******" );
    }
    
    salida.calculoIVA = function(valor1, valor2) {
        return (valor1 * valor2 );
    }
    return salida;
})
;
