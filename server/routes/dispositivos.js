// 
// OPERACIONES EN SERVIDOR DE UNA ENTIDAD: *********  DISPOSITIVOS  *********
// 

console.log('Dispositivos');

var express = require('express');
var router = express.Router();
var path = require('path');

const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var glbApi = '/api/v1/dispositivos';
var glbSelect = 'SELECT * FROM wabaw.dispositivos ORDER BY codigo_dispositivo ASC;';

router.use(bodyParser.json());                          // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded


//
// ALTA
//
router.post( glbApi, (req, res, next) => {
    const results = [];
    // Graba datos from http request
    const data = { codigo_dispositivo: req.body.codigo_dispositivo,
                   nombre : req.body.nombre,
                   marca  : req.body.marca,
                   modelo : req.body.modelo,
                   fecha_compra : req.body.fecha_compra,
                   observaciones: req.body.observaciones
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
        client.query('INSERT INTO wabaw.Dispositivos(CODIGO_DISPOSITIVO, NOMBRE, MARCA, MODELO, FECHA_COMPRA, OBSERVACIONES) values($1, $2, $3, $4, $5, $6 )', [data.codigo_dispositivo, data.nombre, data.marca, data.modelo, data.fecha_compra, data.observaciones]);
        // SQL Query > Select Data
        const query = client.query(glbSelect);
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
    console.log (id);
    // Graba datos from http request
    const data = { codigo_dispositivo: req.body.codigo_dispositivo,
                   nombre : req.body.nombre,
                   marca  : req.body.marca,
                   modelo : req.body.modelo,
                   fecha_compra : req.body.fecha_compra,
                   observaciones: req.body.observaciones
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
        client.query('UPDATE wabaw.dispositivos SET nombre=($2), marca=($3), modelo=($4), fecha_compra=($5), observaciones=($6) WHERE codigo_dispositivo=($1)', 
                     [id, data.nombre, data.marca, data.modelo, data.fecha_compra, data.observaciones]);
        // SQL Query > Select Data
        const query = client.query(glbSelect);
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
        client.query('DELETE FROM wabaw.dispositivos WHERE codigo_dispositivo=($1)', [id]);
        // SQL Query > Select Data
        var query = client.query(glbSelect);
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
    const query = client.query(glbSelect);
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
// LEER DATOS DE UN SOLO REGISTRO
//
router.get( glbApi + '/:id', (req, res, next) => {
    const results = [];
    const id = req.params.id;
    console.log (id);
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM wabaw.dispositivos WHERE codigo_dispositivo=($1)', [id]);
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
