// 
// OPERACIONES EN SERVIDOR DE UNA ENTIDAD: *********  POSTS   *********
// 

console.log('POSTS');

var express = require('express');
var router = express.Router();
var path = require('path');

const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var glbApi = '/api/v1/posts';

router.use(bodyParser.json());                          // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded


// 
// ALTA 
//
router.post( glbApi, (req, res, next) => {
    const results = [];
    // Graba datos from http request
    const data = { codigo: req.body.codigo, 
                   login: req.body.login,
                   valor_general: req.body.valor_general,
                   valor_limpieza: req.body.valor_limpieza,
                   valor_servicio: req.body.valor_servicio,
                   redes_sociales: req.body.redes_sociales,
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
        client.query('INSERT INTO wabaw.posts_general(LOGIN, VALOR_GENERAL, VALOR_LIMPIEZA, VALOR_SERVICIO, REDES_SOCIALES, OBSERVACIONES, FECHA) values($1, $2, $3, $4, $5, $6, CURRENT_DATE)',
                     [data.login, data.valor_general, data.valor_limpieza, data.valor_servicio, data.redes_sociales, data.observaciones ]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM wabaw.posts_general ORDER BY CODIGO DESC');
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
    const query = client.query('SELECT * FROM wabaw.posts_general ORDER BY CODIGO DESC;');
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
router.put( '/api/v1/posts/:id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.id;
    // Graba datos from http request
    const data = { codigo: id, 
                   login: req.body.login,
                   valor_general: req.body.valor_general,
                   valor_limpieza: req.body.valor_limpieza,
                   valor_servicio: req.body.valor_servicio,
                   redes_sociales: req.body.redes_sociales,
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

        console.log('put Modifico post_general ' + id);
        // SQL Query > Update Data
        client.query('UPDATE wabaw.posts_general SET login=($2), valor_general=($3), valor_limpieza=($4), valor_servicio=($5), redes_sociales=($6), observaciones=($7) WHERE codigo=($1)', 
                     [id, data.login, data.valor_general, data.valor_limpieza, data.valor_servicio, data.redes_sociales, data.observaciones]);
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM wabaw.posts_general ORDER BY CODIGO DESC");
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
        client.query('DELETE FROM wabaw.posts_general WHERE codigo=($1)', [id]);
        // SQL Query > Select Data
        var query = client.query('SELECT * FROM wabaw.posts_general ORDER BY CODIGO DESC');
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
