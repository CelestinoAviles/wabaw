//---------------------------------------------------------//
// modulo **** GENERAL *****
//---------------------------------------------------------//
angular.module('general', [])

angular.module('general')
    .component('general', {
        templateUrl: '',
        controller: function GeneralController($scope, $http, $routeParams, $location) {

            $scope.CurrentDate = new Date();
            $scope.FechaActual = new Date();

        }
    };
       