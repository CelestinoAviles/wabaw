// 
// OPERACIONES EN SERVIDOR DE UNA ENTIDAD: *********  EMPLEADOS   *********
// 


var express = require('express');
var router = express.Router();
var path = require('path');

const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var glbApi = '/api/v1/empleados';


router.use(bodyParser.json());                          // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded


// 
// ALTA 
//
router.post(glbApi, (req, res, next) => {
    const results = [];
    // Graba datos from http request
    const data = { codigo: req.body.codigo, 
                   nombre: req.body.nombre,
                   apellidos: req.body.apellidos,
                   email: req.body.email,
                   telefono1: req.body.telefono1,
                   pwd: req.body.pwd,
                   perfil: req.body.perfil
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
        client.query('INSERT INTO wabaw.empleados(NOMBRE, APELLIDOS, EMAIL, TELEFONO1, PWD, PERFIL) values($1, $2, $3, $4, $5, $6)',
                     [data.nombre, data.apellidos, data.email, data.telefono1, data.pwd, data. perfil]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM wabaw.empleados ORDER BY apellidos ASC');
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
    const query = client.query('SELECT * FROM wabaw.empleados ORDER BY apellidos ASC;');
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
    const data = {codigo: id, 
                  nombre: req.body.nombre, 
                  apellidos: req.body.apellidos,
                  email: req.body.email,
                  telefono1: req.body.telefono1,
                  pwd: req.body.pwd,
                  perfil: req.body.perfil
                 };

    
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        console.log('put 000' + data.codigo);
        // SQL Query > Update Data
        client.query('UPDATE wabaw.empleados SET nombre=($2), apellidos=($3), email=($4), telefono1=($5), PWD=($6), PERFIL=($7) WHERE codigo=($1)', 
                     [data.codigo, data.nombre, data.apellidos, data.email, data.telefono1, data.pwd, data.perfil]);
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM wabaw.empleados ORDER BY apellidos ASC");
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
        client.query('DELETE FROM wabaw.empleados WHERE codigo=($1)', [id]);
        // SQL Query > Select Data
        var query = client.query('SELECT * FROM wabaw.empleados ORDER BY apellidos ASC');
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
