//---------------------------------------------------------//
// modulo **** OPINIONES SOBRE EL ESTABLECIMIENTO   *****
//---------------------------------------------------------//
(function() {

angular.module('posts')
    .component('postsCliente', {
        templateUrl: 'app/partials/' + 'posts' + '/' + 'posts-cliente' + '.template.html',
        controller: function EntidadController($scope, $http, $routeParams, $location) {

            var auxRuta = '/posts/api/v1/posts';
            var auxEntidad = 'Opiniones sobre servicios y productos del Establecimiento';
    
            $scope.opcionCliente = true;
            $scope.verFacebook = true;
            $scope.rate = 1;
            $scope.max = 5;
            $scope.texto = auxEntidad.toUpperCase();;
            $scope.dat = [];
            $scope.datSel = [];
            $scope.showCategoria = false;
            $scope.insert = false;
            $scope.update = false;

            mostrarDatos();

            function mostrarDatos() {
                $scope.dat = [];
                $http.get( auxRuta )
                    .success((data) => {
                    $scope.dat = data;
                })
                .error((error) => {
                    console.log('Error: ' + error);
                });
            
            }

            $scope.ver = function(index) {
                $scope.datSel = {};
                $scope.datSel = $scope.dat[index];
                $scope.datSel.index = index;
                $scope.showCategoria = true;
                $scope.insert = false;
                $scope.upate = false;
            }

            $scope.edit = function(index) {
                $scope.ver(index);
                $scope.update = true;
            }

        
            $scope.delete = function(index) {
                var auxId = $scope.dat[index].codigo;
                $http.delete(auxRuta + '/' + auxId)
                    .success((data) => {
                    $scope.dat = data;
                })
                    .error((data) => {
                    console.log('Error: ' + data);
                });
            }


            $scope.newItem = function() {
                $scope.datSel = {};
                $scope.showCategoria = true;
                $scope.insert = true;
            }

            
            $scope.volver = function() {
                $scope.datSel = {};
                $scope.showCategoria = false;
                mostrarDatos();
            }

            function CargarFacebook() {
                window.fbAsyncInit = function() {
                    FB.init({
                        appId      : '1303323409750155',
                        xfbml      : true,
                        version    : 'v2.8'
                    });
                    FB.ui(
                        {
                            method: 'share',
                            href: 'https://developers.facebook.com/docs/'
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
                    

            
            
            $scope.grabar = function() {
                if ($scope.insert) {
                    $scope.showCategoria = false;
                    $scope.insert = false;
                    
                    $http.post(auxRuta, $scope.datSel)
                        .success((data) => {
                        $scope.dat = data;
                    })
                        .error((error) => {
                        console.log('Error: ' + error);
                    });
//
                    CargarFacebook();
//
                }
                 else {
                     $http.put(auxRuta + '/' + $scope.datSel.codigo, $scope.datSel)
                         .success((data) => {
                        $scope.datSel = {};
                    })
                        .error((error) => {
                         console.log('Error: ' + error);
                     });

                    $scope.dat[$scope.index] = $scope.datSel;
                    $scope.showCategoria = false;
                    $scope.insert = false;
                };
            }
        }
    });

    })();
