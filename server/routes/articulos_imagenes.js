// 
// OPERACIONES EN SERVIDOR DE UNA ENTIDAD: *********  ARTICULOS IMAGENES   *********
// 

console.log('Articulos Imagenes');

var express = require('express');
var router = express.Router();
var path = require('path');

const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var glbApi = '/api/v1/articulosimagenes';

router.use(bodyParser.json());                          // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded


// 
// ALTA 
//
router.post( glbApi, (req, res, next) => {
    const results = [];
    // Graba datos from http request
    const data = { codigo:          req.body.codigo,
                   codigo_articulo: req.body.codigo_articulo,
                   codigo_imagen:   req.body.codigo_imagen,
                   numero_orden:    req.body.numero_orden
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
        client.query('INSERT INTO wabaw.Articulos_IMAGENES(CODIGO_ARTICULO, CODIGO_IMAGEN, NUMERO_ORDEN) values($1, $2, $3 )',
                     [data.codigo_articulo, data.codigo_imagen, data.numero_orden ]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM wabaw.Articulos_IMAGENES ORDER BY codigo_articulo, numero_orden ASC');
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
        var aux = 'SELECT AI.CODIGO, AI.CODIGO_ARTICULO, A.NOMBRE, AI.CODIGO_IMAGEN, I.URL, AI.NUMERO_ORDEN ' 
        aux = aux + ' FROM wabaw.Articulos_IMAGENES AS AI, '
        aux = aux + ' wabaw.articulos as A, '
        aux = aux + ' wabaw.imagenes as I '
        aux = aux + ' where AI.CODIGO_ARTICULO = A.CODIGO '
        aux = aux + ' AND AI.CODIGO_IMAGEN = I.CODIGO '
        aux = aux + ' ORDER BY codigo_articulo, numero_orden ASC'


        // SQL Query > Select Data
        var aux = 'SELECT AI.CODIGO, AI.CODIGO_ARTICULO, A.NOMBRE, AI.CODIGO_IMAGEN, I.URL, AI.NUMERO_ORDEN' 
        aux = aux + ' FROM wabaw.Articulos_IMAGENES AS AI '
        aux = aux + ' FULL OUTER JOIN wabaw.articulos as A '
        aux = aux + ' ON AI.CODIGO_ARTICULO = A.CODIGO '
        aux = aux + ' LEFT  OUTER JOIN wabaw.IMAGENES as I '
        aux = aux + ' ON AI.CODIGO_IMAGEN = I.CODIGO '
        aux = aux + ' ORDER BY codigo_articulo, numero_orden ASC'
        
        const query = client.query( aux );
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
    const data = { codigo:          req.body.codigo,
                   codigo_articulo: req.body.codigo_articulo,
                   codigo_imagen:   req.body.codigo_imagen,
                   numero_orden:    req.body.numero_orden
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
        client.query('UPDATE wabaw.Articulos_IMAGENES SET codigo_articulo=($2), codigo_imagen=($3), numero_orden=($4) WHERE CODIGO=($1)', 
                     [data.codigo, data.codigo_articulo, data.codigo_imagen, data.numero_orden]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM wabaw.Articulos_IMAGENES ORDER BY codigo_articulo, numero_orden ASC');
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
        client.query('DELETE FROM wabaw.Articulos_IMAGENES WHERE CODIGO=($1)', [id]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM wabaw.Articulos_IMAGENES ORDER BY codigo_articulo, numero_orden ASC');
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
