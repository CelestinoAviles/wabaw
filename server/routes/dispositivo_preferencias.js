// 
// OPERACIONES EN SERVIDOR DE UNA ENTIDAD: *********  DISPOSITIVO PREFERENCIAS   *********
// 

console.log('Preferencias del dispositivo');

var express = require('express');
var router = express.Router();
var path = require('path');

const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var glbApi = '/api/v1/dispositivopreferencias';

router.use(bodyParser.json());                          // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded


// 
// ALTA 
//
router.post( glbApi, (req, res, next) => {
    const results = [];
    // Graba datos from http request
    const data = { codigo_dispositivo: req.body.codigo_dispositivo,
                   nombre_dispositivo: req.body.nombre_dispositivo,
                   codigo_espacio:     req.body.codigo_espacio,
                   idioma_dispositivo: req.body.idioma_dispositivo
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
        client.query('INSERT INTO wabaw.Dispositivo_Preferencias(CODIGO_DISPOSITIVO, NOMBRE_DISPOSITIVO, CODIGO_ESPACIO, IDIOMA_DISPOSITIVO) values($1, $2, $3, $4 )',
                     [data.codigo_dispositivo, data.nombre_dispositivo, data.codigo_espacio, data.idioma_dispositivo ]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM wabaw.dispositivo_preferencias ORDER BY codigo_dispositivo DESC;');
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
    const query = client.query('SELECT * FROM wabaw.dispositivo_preferencias ORDER BY codigo_dispositivo DESC;');
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
                   nombre_dispositivo: req.body.nombre_dispositivo,
                   codigo_espacio:     req.body.codigo_espacio,
                   idioma_dispositivo: req.body.idioma_dispositivo
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
        client.query('UPDATE wabaw.dispositivo_preferencias SET codigo_dispositivo=($2), nombre_dispositivo=($3), codigo_espacio=($4), idioma_dispositivo=($5) WHERE codigo_dispositivo=($1)', 
                     [id, data.codigo_dispositivo, data.nombre_dispositivo, data.codigo_espacio, data.idioma_dispositivo]);
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM wabaw.dispositivo_preferencias ORDER BY codigo_dispositivo DESC;");
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
        client.query('DELETE FROM wabaw.dispositivo_preferencias WHERE codigo_dispositivo=($1)', [id]);
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM wabaw.dispositivo_preferencias ORDER BY codigo_dispositivo DESC;");
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
