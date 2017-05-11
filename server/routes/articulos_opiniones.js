// 
// OPERACIONES EN SERVIDOR DE UNA ENTIDAD: *********  ARTICULOS OPINIONES   *********
// 

console.log('Articulos Opiniones');

var express = require('express');
var router = express.Router();
var path = require('path');

const pg = require('pg');

var auxQuery = 'SELECT ao.*, a.nombre FROM wabaw.ARTICULOS_OPINIONES AO, wabaw.articulos A';
auxQuery = auxQuery + ' WHERE ao.codigo_articulo = a.codigo';
auxQuery = auxQuery + ' ORDER BY ao.FECHA DESC';

const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var glbApi = '/api/v1/articulosopiniones';

router.use(bodyParser.json());                          // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded


// 
// ALTA 
//
router.post( glbApi, (req, res, next) => {
    const results = [];
    // Graba datos from http request
    const data = { login: req.body.login,
                   codigo_articulo: req.body.codigo_articulo,
                   valorgeneral: req.body.valorgeneral,
                   observaciones: req.body.observaciones
                 };
    console.log('Art.Opi');
    console.log(data);
    

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
      
        // SQL Query > Insert Data
        client.query('INSERT INTO wabaw.Articulos_Opiniones(LOGIN, CODIGO_ARTICULO, VALORGENERAL, OBSERVACIONES, FECHA) values($1, $2, $3, $4, LOCALTIMESTAMP )',
                     [data.login, data.codigo_articulo, data.valorgeneral, data.observaciones ]);
        // SQL Query > Select Data
        const query = client.query( auxQuery );
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
    const query = client.query(auxQuery);
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
// LEER DATOS DE OPINIONES DE UN ARTICULO
//
router.get( glbApi + '/:id', (req, res, next) => {
  const results = [];
    id = req.params.id;
    console.log('leo opi');
    console.log(id);
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM wabaw.ARTICULOS_OPINIONES WHERE CODIGO_ARTICULO = ($1) ORDER BY FECHA DESC;', [id]);
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
    const data = { id: id,
                  codigo_articulo: req.body.codigo_articulo,
                  login         : req.body.login,
                  fecha         : req.body.fecha,
                  valorgeneral  : req.body.valorgeneral,
                  observaciones : req.body.observaciones
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
        client.query('UPDATE wabaw.articulos_opiniones SET login=($2), codigo_articulo=($3), fecha=($4), valorgeneral=($5), observaciones=($6) WHERE id=($1)', 
                     [data.id, data.login, data.codigo_articulo, data.fecha, data.valorgeneral, data.observaciones]);
        // SQL Query > Select Data
        const query = client.query( auxQuery );
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
        client.query('DELETE FROM wabaw.articulos_opiniones WHERE id=($1)', [id]);
        // SQL Query > Select Data
        var query = client.query( auxQuery );
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
