// 
// OPERACIONES EN SERVIDOR DE UNA ENTIDAD: *********  ESTADOS   *********
// 


var express = require('express');
var router = express.Router();
var path = require('path');

const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var glbApi = '/api/v1/estados';


router.use(bodyParser.json());                          // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded

    var glbConsulta = 'SELECT * FROM wabaw.estados ORDER BY tipo, orden ASC'

// 
// ALTA 
//
router.post(glbApi, (req, res, next) => {
    const results = [];
    // Graba datos from http request
    const data = { codigo: req.body.codigo, 
                   tipo  : req.body.tipo,
                   orden : req.body.orden,
                   nombre: req.body.nombre,
                   estado_inicial: req.body.estado_inicial,
                   estado_final  : req.body.estado_final,
                   color : req.body.color
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
        client.query('INSERT INTO wabaw.estados(CODIGO, TIPO, ORDEN, NOMBRE, ESTADO_INICIAL, ESTADO_FINAL, COLOR) values($1, $2, $3, $4, $5, $6, $7)', [data.codigo, data.tipo, data.orden, data.nombre, data.estado_inicial, data.estado_final, data.color]);
        // SQL Query > Select Data
        const query = client.query( glbConsulta );
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
// LEER DATOS POR NOMBRE
//
router.get( '/api/v1/estados/nombremesa/:nombre', (req, res, next) => {
    const results = [];
    const nombre = req.params.nombre.trim();
    console.log(nombre)
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
      // SQL Query > Select Data
      glbConsulta = 'SELECT * FROM wabaw.estados where tipo = \'MES\' and nombre=($1)'
      console.log(glbConsulta);
      console.log(nombre);
      const query = client.query( glbConsulta, [nombre] );
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
    console.log('get estados');
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
    const query = client.query( glbConsulta );
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
router.put( glbApi + '/:codigo', (req, res, next) => {
    const results = [];
    // Graba datos from http request
    const data = { codigo: req.body.codigo, 
                   tipo  : req.body.tipo,
                   orden : req.body.orden,
                   nombre: req.body.nombre,
                   estado_inicial: req.body.estado_inicial,
                   estado_final  : req.body.estado_final,
                   color : req.body.color
                 };

    
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Update Data
        client.query('UPDATE wabaw.estados SET tipo=($2), orden=($3), nombre=($4), estado_inicial=($5), estado_final=($6), color=($7) WHERE codigo=($1)', 
                     [data.codigo, data.tipo, data.orden, data.nombre, data.estado_inicial, data.estado_final, data.color]);
        // SQL Query > Select Data
        const query = client.query(glbConsulta);
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
        });
});


//
//  BORRA
//
router.delete( glbApi + '/:codigo', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const codigo = req.params.codigo;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query('DELETE FROM wabaw.estados WHERE codigo=($1)', [id]);
        // SQL Query > Select Data
        var query = client.query(glbConsulta);
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
