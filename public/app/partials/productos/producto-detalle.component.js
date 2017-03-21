//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
// Define the `Menu de inicio` module
//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
(function(){

var app = angular.module('productoDetalle', []);

app.directive('productoPaneles', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/partials/productos/producto-paneles.html'
        };
    })
    .component('productoDetalle', {
        templateUrl: 'app/partials/productos/producto-detalle.template.html',
        controller: ['$http','$scope', function ProductoDetalleController($http, $scope) {
            
            $scope.ofertas = [];
            $http({ method: 'GET', url: 'app/partials/productos/ofertas.json'});

            $http.get('app/partials/productos/ofertas.json')
            .success(function(data) {
                alert('Hola');
                console.log(data);
                $scope.ofertas = data;
            })
            .error(function(data){
                alert("error");
            });


            
            //
            // PRODUCTOS
            //
            var productos = [
                { idProducto: 1, 
                  nomProducto: 'CocaCola',
                  dscProducto: 'Refresco de Cola',
                  cantidad: 10,
                  pvp: 10,
                  enVenta: true,
                  relacionados: [
                      {relId: 10,
                       relNom: 'Coca Cola Cero',
                       relPvp: 1.50,
                       relImg:  '../../../img/producto/cocacola.jpg'
                      },
                      {relId: 12,
                       relNom: 'Café Latte Cero',
                       relPvp: 1.75,
                       relImg:  '../../../img/producto/cocacola.jpg'
                      }
                  ],
                 imagenes: [
                     {imagenId: 1,
                      imagenimg: '../../img/producto/cocacola.jpg'
                     },
                     {imagenId: 4,
                      imagenimg: '../../img/producto/cocacola.jpg'
                     },
                     {imagenId: 2,
                      imagenimg: '../../img/producto/cocacola.jpg'
                     },
                     {imagenId: 3,
                      imagenimg: '../../img/producto/cocacola.jpg'
                     }
                 ],
                 ingredientes: [
                     {Id: 1,
                      nombre: 'Azúcar',
                      cantidad: '10 mg'
                     },
                     {Id: 2,
                      nombre: 'Leche',
                      cantidad: '15 mg'
                     }
                 ],
                 alergenos: [
                     {Id: 1,
                      nombre: 'Azúcar'
                     },
                     {Id: 2,
                      nombre: 'Glúten',
                     }
                 ],
                 opiniones: [
                     {Id: 1,
                      valoracion: 5,
                      fecha: '',
                      texto: 'Me encanta',
                      autor: 'juan.nadie@c.com'
                     },
                     {Id: 2,
                      valoracion: 4,
                      fecha: '',
                      texto: 'Me encanta',
                      autor: 'juan.nadie@c.com'
                     },
                     {Id: 3,
                      valoracion: 5,
                      fecha: '',
                      texto: 'Me encanta',
                      autor: 'juan.nadie@c.com'
                     },
                     {Id: 4,
                      valoracion: 2,
                      fecha: '',
                      texto: 'Me encanta',
                      autor: 'juan.nadie@c.com'
                     }
                 ]
                 
                },
                
                { idProducto: 2, 
                  nomProducto: 'Fanta',
                  dscProducto: 'Refresco de Naranja',
                  cantidad: 10,
                  pvp: 10,
                  enVenta: true,
                  relacionados: [
                      {relId: 10,
                       relNom: 'Coca Cola Cero',
                       relPvp: 1.50,
                       relImg:  '../../../img/producto/cocacola.jpg'
                      },
                      {relId: 12,
                       relNom: 'Café Latte Cero',
                       relPvp: 1.75,
                       relImg:  '../../../img/producto/cocacola.jpg'
                      }
                  ],
                 imagenes: [
                     {imagenId: 1,
                      imagenimg: '../../../img/producto/cocacola.jpg'
                     },
                     {imagenId: 1,
                      imagenimg: '../../../img/producto/cocacola.jpg'
                     },
                     {imagenId: 3,
                      imagenimg: 'img/producto/cocacola.jpg'
                     }
                 ],
                 ingredientes: [
                     {Id: 1,
                      nombre: 'Azúcar',
                      cantidad: '10 mg'
                     },
                     {Id: 2,
                      nombre: 'Leche',
                      cantidad: '15 mg'
                     }
                 ],
                 alergenos: [
                     {Id: 1,
                      nombre: 'Frutos secos'
                     },
                     {Id: 2,
                      nombre: 'Soja',
                     }
                 ]
                 
                }
                
            ];
            

            $scope.productos = productos;
            var auxTxt = 'Detalle de productos'
                //           alert('Entro en ' + auxTxt);
            $scope.texto = auxTxt;

            this.verDetalle = function() {
                $location.path('/productoDetalle');
            };
            this.volver = function() {
                $location.path('/inicio');
            };

//            this.tab = 1;  Este no funciona por ahora. 
            $scope.tab = 0;

            $scope.selecTab = function(auxTab) {
              $scope.tab = auxTab;  
            };

            $scope.isSelected = function(auxTab) {
              return $scope.tab === auxTab;  
            };
            
            $scope.addOpinion = function(auxProducto) {
              console.log(auxProducto);
              $scope.review.fecha = Date.now();
              auxProducto.opiniones.push($scope.review);
                $scope.review = {};
            };

        }
    ]});

})();