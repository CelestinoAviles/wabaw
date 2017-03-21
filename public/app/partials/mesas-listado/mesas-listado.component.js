'use strict';

// Registra el componente con su plantilla y su controlador

angular.
module('mesasListado').
component('mesasListado', {
    templateUrl: 'app/partials/views/mesas-listado/mesas-listado.template.html',
    controller: function MesasListadoController(Mesa) {
        var self = this;
        self.orderProp = 'age';

        self.mesas = Mesa.getAll({}, function(mesas) {
            //self.setImage(phone.images[0].img);
        });
    }
});