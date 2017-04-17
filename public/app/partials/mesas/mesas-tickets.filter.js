//---------------------------------------------------------//
// modulo **** MESA TICKET *****
//---------------------------------------------------------//
angular.module('mesas-tickets')
.filter('countItemsInOrder', function () {
    return function (listOfProducts) {
        //  Count how many items are in this order
        var total = 0;
        angular.forEach(listOfProducts, function (product) {
            total += parseFloat(product.cantidad);
        });
        return total;
    }
})
   .filter('sumByKey', function() {
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
.filter('orderTotal', function () {
    return function (listOfProducts) {
        //  Calculate the total value of a particular Order
        var total = 0;
        angular.forEach(listOfProducts, function (product) {
            console.log("entro en filtro " + product.cantidad + " * " + product.pvu + " <-" )
            total += (parseFloat(product.cantidad) * parseFloat(product.pvu));
            console.log("entro en filtro " + total.toFixed(2))
        });
        return total.toFixed(2);
    }
})
