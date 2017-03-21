// Prueba con CATS pero daría igual con otro.
var express = require('express');

var router = express.Router();

const pg = require('pg');
// const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';


router.get('/', function(req, res) {
    res.send('manejador GET  para /cats route.');
    console.log('GET handler for .._..  /cats route.');
});

router.get('/apu', function(req, res) {
    res.send('manejador GET  para /cats route.');
    console.log('GET handler for ....  /cats rute.');
});

router.post('/', function(req, res) {
    res.send('POST handler for /cats route.');
    console.log('POST handler for /cats route.');
});

//
//
//


//
// GET home page.
//
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'views', 'index.html'));
});


// 
// ALTA de registro en tabla
//
router.post('/api/v1/todos', (req, res, next) => {
    const results = [];
    // Graba datos from http request
    const data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
      
        // SQL Query > Insert Data
        client.query('INSERT INTO wabaw.items(text, complete) values($1, $2)',
                     [data.text, data.complete]);
      
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM wabaw.items ORDER BY id ASC');
      
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
// Lectura de todos los datos del fichero
//
router.get('/api/v1/cats', (req, res, next) => {
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
    const query = client.query('SELECT * FROM wabaw.items ORDER BY id ASC;');
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
//  MODIFICA EL REGISTRO
//
router.put('/api/v1/todos/:todo_id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.todo_id;
    // Graba datos from http request
    const data = {text: req.body.text, complete: req.body.complete};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Update Data
        client.query('UPDATE wabaw.items SET text=($1), complete=($2) WHERE id=($3)',
                     [data.text, data.complete, id]);
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM wabaw.items ORDER BY id ASC");
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
//  BORRAR un registro.
//
router.delete('/api/v1/todos/:todo_id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.todo_id;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query('DELETE FROM wabaw.items WHERE id=($1)', [id]);
        // SQL Query > Select Data
        var query = client.query('SELECT * FROM wabaw.items ORDER BY id ASC');
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
