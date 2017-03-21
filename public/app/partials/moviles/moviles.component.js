		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		// Define the `Menu de inicio` module
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		//---------------------------------------------------------//
		angular.module('moviles', []);
        angular.module('moviles')
		    .component('moviles', {
		        templateUrl: 'app/partials/moviles/moviles.template.html',
		        controller: function MesasController($scope, $routeParams, $location) {
		            var auxMesas = [
		                { idMesa: 1, nombreMesa: "Mesa 1" },
		                { idMesa: 2, nombreMesa: "Mesa 2" },
		                { idMesa: 3, nombreMesa: "Mesa 3" }
		            ];
		            //		            alert('Entro en ' + auxTxt);
		            $scope.texto = "Gestión de móviles";
		            $scope.mesas = auxMesas
		            $scope.entity = {}

		            $scope.edit = function(index) {
		                $scope.entity = $scope.mesas[index];
		                $scope.entity.index = index;
		                $scope.entity.editable = true;
		            }

		            $scope.delete = function(index) {
		                $scope.mesas.splice(index, 1);
		            }

		            $scope.save = function(index) {
		                $scope.mesas[index].editable = false;

		            }

		            $scope.add = function() {
		                $scope.mesas.push({
		                    name: "",
		                    country: "",
		                    editable: true
		                })
		            }

		        }
		    });