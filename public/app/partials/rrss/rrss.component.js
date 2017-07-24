//---------------------------------------------------------//
// Componente  **** RRSS Redes Sociales *****
//---------------------------------------------------------//

(function(angular) {

angular.module('rrss')
    .component('rrss', {
        templateUrl: 'app/partials/rrss/rrss.template.html',
        controller: function RrssController($scope) {
            var vm = this;
            console.log('2 ' + vm.parametro + ' 2');
            
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
        },
    bindings: {
        parametro: '@'
    }
    });

    
})(window.angular);
