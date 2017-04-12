// 
// OPERACIONES EN SERVIDOR DE UNA ENTIDAD: *********  TICKETS_LINEAS   *********
// 

console.log('Tickets_lineas');

var express = require('express');
var router = express.Router();
var path = require('path');

const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var glbApi = '/api/v1/ticketslineas';

router.use(bodyParser.json());                          // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded

// 
// ALTA 
//
router.post( glbApi, (req, res, next) => {
    const results = [];
    // Graba datos from http request
    const data = { codigo:       req.body.codigo, 
                   cod_ticket:   req.body.cod_ticket,
                   cod_articulo: req.body.cod_articulo,
                   cantidad:     req.body.cantidad,
                   pvu:          req.body.pvu,
                   total:        req.body.total,
                   estado:       req.body.estado
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
        client.query('INSERT INTO wabaw.tickets_lineas(COD_TICKET, COD_ARTICULO, CANTIDAD, PVU, TOTAL, ESTADO) values($1, $2, $3, $4, $5, $6 )',
                     [ data.cod_ticket, data.cod_articulo, data.cantidad, data.pvu, data.total, data.estado ]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM wabaw.tickets_lineas ORDER BY codigo ASC');
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
    const query = client.query('SELECT * FROM wabaw.tickets_lineas ORDER BY codigo ASC;');
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
// LEER LINEAS DE UN TICKET
//
router.get( glbApi+"/:id", (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.id;
    console.log(id);
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

        // SQL Query > Select
        client.query('SELECT * FROM wabaw.tickets_lineas WHERE cod_ticket=($1)', [id]);
      // SQL Query > Select Data
    const query = client.query('SELECT * FROM wabaw.tickets_lineas WHERE cod_ticket=($1)', [id]);
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
//  MODIFICA
//
router.put( glbApi + '/:id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.id;
    // Graba datos from http request
    const data = { codigo:       req.body.codigo, 
                   cod_ticket:   req.body.cod_ticket,
                   cod_articulo: req.body.cod_articulo,
                   cantidad:     req.body.cantidad,
                   pvu:          req.body.pvu,
                   total:        req.body.total,
                   estado:       req.body.estado
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
        client.query('UPDATE wabaw.tickets_lineas SET cod_ticket = ($2), cod_articulo = ($3), cantidad = ($4), pvu = ($5), total = ($6), estado = ($7) WHERE codigo=($1)', [id, data.cod_ticket, data.cod_articulo, data.cantidad, data.pvu, data.total, data.estado ]);

    
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM wabaw.tickets_lineas ORDER BY codigo ASC");
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
        client.query('DELETE FROM wabaw.tickets_lineas WHERE codigo=($1)', [id]);
        // SQL Query > Select Data
        var query = client.query('SELECT * FROM wabaw.tickets_lineas ORDER BY codigo ASC');
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
