// 
// OPERACIONES EN SERVIDOR DE UNA ENTIDAD: *********  MESAS   *********
// 
var express = require('express');
var router = express.Router();
var path = require('path');

const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

router.use(bodyParser.json());                          // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded

var glbApi = '/api/v1/mesas';
// 
// ALTA 
//
router.post( glbApi, (req, res, next) => {
    const results = [];
    // Graba datos from http request
    const data = {  codigo: req.body.codigo,
                    nombre: req.body.nombre,
                    estado: req.body.estado,
                    clave:  req.body.clave,
                    llamada: req.body.llamada
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
        client.query('INSERT INTO wabaw.mesas(codigo, nombre, clave, estado, llamada) values($1,$2, $3, $4, $5)',
                     [data.codigo, data.nombre, data.clave, data.estado, data.llamada]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM wabaw.mesas ORDER BY codigo ASC');
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
// LEER DATOS DE UNA SOLA ENTIDAD
//
router.get( glbApi + '/:id', (req, res, next) => {
  const results = [];
  var codigo = req.params.id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
      console.log('mesa -->'+codigo+'<---')
    // SQL Query > Select Data
    client.query('SELECT * FROM  wabaw.mesas WHERE codigo=($1)',
                     [ codigo ] );
    const query = client.query('SELECT * FROM wabaw.mesas WHERE codigo = ($1)', [codigo]);
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
router.get(glbApi, (req, res, next) => {
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
    const query = client.query('SELECT * FROM wabaw.mesas ORDER BY codigo ASC;');
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
router.put('/api/v1/mesas/:id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const codigo = req.params.id;
    // Graba datos from http request
    const data = {codigo: req.body.codigo, 
                  nombre: req.body.nombre, 
                  clave:  req.body.clave, 
                  estado: req.body.estado, 
                  llamada: req.body.llamada
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
        client.query('UPDATE wabaw.mesas SET nombre=($2), clave=($3), estado=($4), llamada=($5) WHERE codigo=($1)',
                     [data.codigo, data.nombre, data.clave, data.estado, data.llamada]);
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM wabaw.mesas ORDER BY codigo ASC");
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
//  MODIFICA LA LLAMADA DE LA MESA
//
router.put('/api/v1/mesas/llamada/:id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const codigo = req.params.id;
    // Graba datos from http request
    const data = {codigo: req.body.codigo, 
                  llamada: req.body.llamada
                 };

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        console.log('put mesa: ' + data.codigo + ' llamada:' + data.llamada );
        // SQL Query > Update Data
        client.query('UPDATE wabaw.mesas SET llamada=($2) WHERE codigo=($1)',
                     [data.codigo, data.llamada ]);
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM wabaw.mesas ORDER BY codigo ASC");
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
//  GENERA NUEVA CLAVE A UNA MESA
//
router.put('/api/v1/mesas/nuevaClave/:id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const codigo = req.params.id;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        var miNumeroAleatorio = Math.floor(Math.random()*9999)+1000        

        console.log('nueva clave mesa: ' + codigo + ' número:' + miNumeroAleatorio );
        // SQL Query > Update Data
        client.query('UPDATE wabaw.mesas SET clave=($2) WHERE codigo=($1)',
                     [codigo, miNumeroAleatorio ]);
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM wabaw.mesas ORDER BY codigo ASC");
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
router.delete('/api/v1/mesas/:id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const codigo = req.params.id;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query('DELETE FROM wabaw.mesas WHERE codigo=($1)', [codigo]);
        // SQL Query > Select Data
        var query = client.query('SELECT * FROM wabaw.mesas ORDER BY codigo ASC');
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
