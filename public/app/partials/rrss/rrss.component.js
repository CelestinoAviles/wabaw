//---------------------------------------------------------//
// Componente  **** RRSS Redes Sociales *****
//---------------------------------------------------------//

(function() {

angular.module('rrss')
    .component('rrssTest', {
    template: "<div>Contact id from view: {{$ctrl.param2}}</div>",
    controller: function rrssController ($scope) {
        console.log(`contacto id from controller: ${this.parametro}`);
        console.log('contacto id from controller: ' + this.parametro);
        console.log(this);
        console.log(this.param2);
        
  },
    bindings: {
        "parametro": '@',
        "param2": '@'
    }
    });
    
    
angular.module('rrss')
    .component('rrss000', {
    templateUrl: 'app/partials/rrss/rrss.template.html',
    controllerAs: "model",
    controller: function rrssController ($scope, Socialshare) {
        var vm = this;
        this.$onInit = function () {
        
            $scope.CompartirTwitter = CompartirTwitter;
            $scope.CompartirFacebook = CompartirFacebook;

            var model = $scope.model;
            console.log('muestro parametro');
            console.log(model.parametro);
            console.log(vm.parametro);
            console.log($scope.parametro);
            console.log(model);
            console.log(model.param2);
            console.log(model.parametro);
            console.log(vm);
            console.log(vm.parametro);
            console.log(`contact id from controller: ${this.param2}`);
            console.log('fin muestro parametro');

            $scope.verTwitterEmpresa = false;

            $scope.textoTwitter = "Un sitio estupendo para tomar un buen café";
            $scope.urlTwitter = "http://www.pensionsegura.es/index.php?section=catalogo&idioma=es"

            if (this.parametro == "empresa") {
                $scope.verTwitterEmpresa = true;
                $scope.textoTwitter = "";
                $scope.urlTwitter = "https://twitter.com/river97";
                $scope.tagTwitter = "HeladeriaAlfonso, PensionSegura"
            };
            if (this.parametro == "general") {
                $scope.textoTwitter = "Un sitio estupendo para tomar cualquier cosa";
                $scope.urlTwitter = "http://www.pensionsegura.es/index.php?section=catalogo&idioma=es";
                $scope.tagTwitter = "HeladeriaAlfonso, PensionSegura"
            };
            if (this.parametro == "pie") {
                $scope.textoTwitter = "Un sitio estupendo para relajarte";
                $scope.urlTwitter = "http://www.pensionsegura.es/"
                $scope.tagTwitter = "HeladeriaAlfonso, PensionSegura"
            };
            if (this.parametro == "producto") {
                $scope.textoTwitter = "Es interesante probar este producto";
                $scope.urlTwitter = "http://www.pensionsegura.es/"
                $scope.tagTwitter = "HeladeriaAlfonso"
            };

            $scope.texto = "Redes Sociales";
            
            function CompartirTwitter() {
                Socialshare.share({
                    'provider': 'twitter',
                    'attrs': {
                        'socialshareUrl': $scope.urlTwitter,
                        'socialshareText': $scope.textoTwitter,
                        'socialshareHashtags' : $scope.tagTwitter
                    }
                });
            };

    
            function CompartirFacebook() {
                Socialshare.share({
                    'provider': 'facebook',
                    'attrs': {
                        'socialshareUrl':  $scope.urlTwitter,
                        'socialshareType': 'simple sharer',
                        'socialshareText': 'Muy bueno',
                        'socialshareQuote': 'Fenomenal',
                        'socialshareHashtags' : 'Wabaw'
                    }
                });
            };
            
            };
        },
    bindings: {
        parametro: '@',
        param2: '@'
    }
    });

    
})();
