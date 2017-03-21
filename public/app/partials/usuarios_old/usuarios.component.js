(function(){

var app = angular.module('usuarios', []);

app.directive('usuario', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/partials/usuarios/usuarios.template.html'
        };
    });

app.component('usuarios', {
        templateUrl: 'app/partials/usuarios/usuarios.template.html',
        controller: ['$http','$scope', function UsuariosController($http, $scope) {
            
            $scope.usuarios = [];
            $http({ method: 'GET', url: 'app/partials/usuarios/usuarios.json'});

            $http.get('app/partials/usuarios/usuarios.json')
            .success(function(data) {
                alert('Hola');
                console.log(data);
                $scope.datos = data;
            })
            .error(function(data){
                alert("error");
            });
        }
]});

//hacemos el ruteo de nuestra aplicación
app.config(function($routeProvider){
console.log('congi');
    $routeProvider.when("/", {
		templateUrl : "app/partials/usuarios/usuarios.template.html"
	})
	//esta es la forma de decirle a angular que vamos a pasar una variable por la url

    .when('/app/partials/usuarios/info/:id', {
        templateUrl : "app/partials/usuarios/info.html",
        controller : "infoController"
    })
    
    .when('/info/:id', {
      templateUrl : "app/partials/usuarios/info.html",
     controller : "infoController"
    })
    
	.when('/usuarioadd', {
		title: 'Añadir usuario',
		templateUrl : "app/partials/usuarios/add.html",
		controller : "addController"
	})
	.when("/edit/:id", {
		title: 'Editar usuario',
		templateUrl : "app/partials/usuarios/edit.html",
		controller : "editController"
	})
 	.when("/remove/:id", {
 		title: 'Eliminar usuario',
 		templateUrl : "app/partials/usuarios/remove.html",
 		controller : "removeController"
 	})
 
});

    //	.otherwise({ redirectTo : "/usuarioadd"})
app.controller("appController", function appController($scope){
	//añadimos usuarios por defecto
    console.log('entro en app');
    $scope.usuarios = [
        {
            nombre : "Israel Parra",
            web : "https://www.uno-de-piera.com",
            edad : "32 años",
            profesion : "programador web"
        },
        {
            nombre : "Pepito",
            web : "http://pepito.com",
            edad : "? años",
            profesion : "vender palotes!"
        }
    ]
})
//route params es para identificar los segmentos de la url, en este caso, para reconocer usuarios
app.controller("infoController", function infoController($scope,$routeParams){
	$scope.usuario = $scope.usuarios[$routeParams.id];
    console.log('entro en app');
});
 
//creamos el controlador addController para guardar usuarios nuevos con push
app.controller("addController", function addController($scope,$location){
    console.log('entro en app nuevo');
	$scope.textButton = "Añadir un nuevo usuario";
	$scope.usuario = {};
	$scope.newUser = function(){
		$scope.usuarios.push($scope.usuario);
		$location.url("/");
	}
})
 
app.controller("editController", function editController($scope,$routeParams,$location){
    console.log('entro en app');
	//obtenemos el usuario a editar con routeParams
	$scope.textButton = "Editar usuario";
	$scope.usuario = $scope.usuarios[$routeParams.id];
	$scope.editUser = function(){
		//actualizamos la información del usuario con la id que lleva $routeParams
		$scope.usuarios[$routeParams.id] = $scope.usuario;
		$location.url("/");
	}
})
 
//eliminamos el usuario dependiendo de su id
app.controller("removeController", function removeController($scope,$routeParams,$location){
    console.log('entro en app');
	$scope.usuario = $scope.usuarios[$routeParams.id];
	$scope.removeUser = function(){
		//con splice  eliminamos un usuario del array usuarios, en este caso le decimos que debe eliminar 
		//el que tenga el id que le pasamos con $routeParams, y con el 1, le decimos que sólo 
		//debe eliminar 1, la función splice, como primer parámetro necesita la posición, que en este caso
		//es la id, y el segundo debe ser el número de elementos a eliminar, cabe decir que splice tiene
		//más variantes, y que sirve para añadir y eliminar elementos en un array, pero eso para otro momento
		$scope.usuarios.splice($routeParams.id, 1);
		$location.url("/");
	}
})



})();
