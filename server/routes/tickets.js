// 
// OPERACIONES EN SERVIDOR DE UNA ENTIDAD: *********  TICKETS   *********
// 

console.log('Tickets');

var express = require('express');
var router = express.Router();
var path = require('path');

const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var glbApi = '/api/v1/tickets';

router.use(bodyParser.json());                          // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded

// 
// ALTA 
//
router.post( glbApi, (req, res, next) => {
    const results = [];
    // Graba datos from http request
    const data = { codigo:         req.body.codigo, 
                   cod_cliente:    req.body.cod_cliente,
                   cod_empleado:   req.body.cod_empleado,
                   cod_espacio:    req.body.cod_espacio,
                   fecha_ticket:   req.body.fecha_ticket,
                   fecha_modifica: req.body.fecha_modifica,
                   fecha_pago:     req.body.fecha_pago,
                   observaciones:  req.body.observaciones,
                   subtotal:       req.body.subtotal,
                   prc_descuento:  req.body.prc_descuento,
                   tot_descuento:  req.body.tot_descuento,
                   prc_impuestos:  req.body.prc_impuestos,
                   tot_impuestos:  req.body.tot_impuestos,
                   total:          req.body.total,
                   total_entrega:  req.body.total_entrega,
                   total_cambio:   req.body.total_cambio
                 };

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
      
        // SQL Query > Insert Data
        client.query('INSERT INTO wabaw.tickets(COD_CLIENTE, COD_EMPLEADO, COD_ESPACIO, FECHA_TICKET, FECHA_MODIFICA, OBSERVACIONES) values($1, $2, $3, current_timestamp, current_timestamp, $4)',
                     [ data.cod_cliente, data.cod_empleado, data.cod_espacio, data.observaciones ]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM wabaw.tickets ORDER BY codigo ASC');
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});


//
// LEER TICKETS DE UNA MESA
//

router.get( '/api/v1/mesa-tickets/:id', (req, res, next) => {
    // inicializo variables
    const results = [];
    // asigno la clave a la variable "id"
    const id = req.params.id;

    // Conecto con postgresql
    pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

        client.query('SELECT * FROM WABAW.tickets WHERE cod_espacio=($1)', [id]);
        const query = client.query('SELECT * FROM WABAW.tickets WHERE cod_espacio=($1)', [id]);
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        
        console.log(results);
        
        query.on('end', () => {
            done();
            return res.json(results);
        });
      
  });
});




//
// LEER DATOS
//
router.get( glbApi, (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM wabaw.tickets ORDER BY codigo ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});


//
// LEER DATOS DE UN TICKET
//
router.get( glbApi + '/:id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.id;
    console.log('123-- Mesa ' + id);

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
    }

        client.query('SELECT * FROM WABAW.tickets WHERE cod_espacio=($1)', [id]);
        const query = client.query('SELECT * FROM WABAW.tickets WHERE cod_espacio=($1)', [id]);
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});


//
//  MODIFICA
//
router.put( glbApi + '/:id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.id;
    // Graba datos from http request
    const data = { codigo:         req.body.codigo, 
                   cod_cliente:    req.body.cod_cliente,
                   cod_empleado:   req.body.cod_empleado,
                   cod_espacio:    req.body.cod_espacio,
                   fecha_ticket:   req.body.fecha_ticket,
                   fecha_modifica: req.body.fecha_modifica,
                   fecha_pago:     req.body.fecha_pago,
                   observaciones:  req.body.observaciones,
                   subtotal:       req.body.subtotal,
                   prc_descuento:  req.body.prc_descuento,
                   tot_descuento:  req.body.tot_descuento,
                   prc_impuestos:  req.body.prc_impuestos,
                   tot_impuestos:  req.body.tot_impuestos,
                   total:          req.body.total,
                   estado:         req.body.estado,
                   total_entrega:  req.body.total_entrega,
                   total_cambio:   req.body.total_cambio
                 };

    
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        console.log('put 000');
        // SQL Query > Update Data
        client.query('UPDATE wabaw.tickets SET fecha_modifica = current_timestamp, cod_cliente = ($2), cod_empleado = ($3), observaciones = ($4), cod_espacio = ($5), subtotal    = ($6), prc_descuento = ($7), tot_descuento = ($8), prc_impuestos = ($9), tot_impuestos = ($10), estado = ($11), total = ($12) WHERE codigo=($1)', [id, data.cod_cliente, data.cod_empleado, data.observaciones, data.cod_espacio, data.subtotal, data.prc_descuento, data.tot_descuento, data.prc_impuestos, data.tot_impuestos, data.estado, data.total]);

    
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM wabaw.tickets ORDER BY codigo ASC");
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
        console.log('put 001');
        });
});


//
//  BORRA
//
router.delete( glbApi + '/:id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.id;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query('DELETE FROM wabaw.tickets WHERE codigo=($1)', [id]);
        // SQL Query > Select Data
        var query = client.query('SELECT * FROM wabaw.tickets ORDER BY codigo ASC');
        // Stream results back one row at a time
        query.on('row', (row) => {
        results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});

module.exports = router;
