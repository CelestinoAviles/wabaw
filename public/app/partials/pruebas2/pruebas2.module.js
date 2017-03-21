(function(){

var app = angular.module('pruebas2', []);

app.config(function($routeProvider){
    console.log('p2');
    $routeProvider
        .when('inicio/pruebas2/p2', {
          template: '<mesas></mesas>'
        })
        .when('/pruebas2/p3', {
          template: '<mesas></mesas>'
        });
});
    
app.component('pruebas2', {
		        templateUrl: 'app/partials/pruebas2/pruebas2.template.html',
		        controller: function MenuController($routeParams, $location) {
		            alert('Entro en pruebas dos');
		        }
		    });

    
app.controller('cero', function() {
  this.mensaje2 = 'Hola cero con un tipo de controller!';
});

app.controller('uno', ['$scope', function($scope) {
  this.mensaje2 = 'Hola uno con otr tipo de controller inyectando $scope!';
}]);

    //
    //
app.controller('dos', ['$http', dos]);
function dos($http) {
        this.mensaje2 = 'Hola dos con otro tipo de controller';
        var vm=this;

        vm.buscaEnRegion = function(){
            $http.get(vm.url)
                .success(function(respuesta){
                console.log("Okres:");
                vm.paises = respuesta;
                })
                .error(function(respuesta){
                console.log("res:", respuesta);
                });
        }
        
};

    //
    //
    //
app.controller('tres', ['$http', tres]);
function tres($http) {
        this.mensaje = 'Hola tres con otro tipo de controller';
        var vm=this;
        vm.datos= {};

        vm.grabar = function(){
            $http.post('',vm.datos)
                .success(function(respuesta){
                console.log("OkGrabar:", respuesta );
                })
                .error(function(respuesta){
                console.log("res:", respuesta);
                });
        };
        
};




    
})();