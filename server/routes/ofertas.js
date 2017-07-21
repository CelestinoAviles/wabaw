// 
// OPERACIONES EN SERVIDOR DE UNA ENTIDAD: *********  OFERTAS   *********
//

console.log('Ofertas');

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

auxRuta = '/api/v1/ofertas';

// 
// ALTA 
//
router.post( auxRuta, (req, res, next) => {
    const results = [];
    // Graba datos from http request
    const data = { codigo_articulo: req.body.codigo_articulo, 
                   fechainicio    : req.body.fechainicio,
                   fechafin       : req.body.fechafin,
                   pvp            : req.body.pvp
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
        client.query('INSERT INTO wabaw.ofertas(CODIGO_ARTICULO, FECHAINICIO, FECHAFIN, PVP) values($1,$2,$3,$4)',
                     [data.codigo_articulo, data.fechainicio, data.fechafin, data.pvp ]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM wabaw.ofertas ORDER BY id DESC');
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
router.get( '/api/v1/ofertas-ver', (req, res, next) => {
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
      var aux = 'SELECT ID, OFERTAS.CODIGO_ARTICULO, ARTICULOS.NOMBRE, FECHAINICIO, FECHAFIN, PVP, WABAW.IMAGENES.URL '
      aux = aux + ' FROM wabaw.ofertas '
      aux = aux + ' LEFT OUTER JOIN WABAW.ARTICULOS ON OFERTAS.CODIGO_ARTICULO = ARTICULOS.CODIGO'
      aux = aux + ' LEFT OUTER JOIN WABAW.ARTICULOS_IMAGENES  ON ARTICULOS.CODIGO = ARTICULOS_IMAGENES.CODIGO_ARTICULO '
      aux = aux + ' LEFT OUTER JOIN WABAW.IMAGENES  ON ARTICULOS_IMAGENES.CODIGO_IMAGEN =  WABAW.IMAGENES.CODIGO '
      aux = aux + ' WHERE WABAW.ARTICULOS_IMAGENES.NUMERO_ORDEN = 1'
      aux = aux + '   AND FECHAINICIO <= CURRENT_DATE'
      aux = aux + '   AND    FECHAFIN >= CURRENT_DATE'
      aux = aux + ' ORDER BY id DESC'
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
// LEER DATOS
//
router.get( '/api/v1/ofertas', (req, res, next) => {
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
      var aux = 'SELECT ID, O.CODIGO_ARTICULO, A.NOMBRE, O.FECHAINICIO, O.FECHAFIN, O.PVP '
      aux = aux + ' FROM wabaw.ofertas O, wabaw.articulos A'
      aux = aux + ' WHERE O.CODIGO_ARTICULO = A.CODIGO'
      aux = aux + ' ORDER BY id DESC'
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
router.put( '/api/v1/ofertas/:id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.id;
    // Graba datos from http request
    const data = {id: id, 
                  codigo_articulo: req.body.codigo_articulo, 
                  fechainicio    : req.body.fechainicio,
                  fechafin       : req.body.fechafin,
                  pvp            : req.body.pvp
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
        client.query('UPDATE wabaw.ofertas SET codigo_articulo=($2), fechainicio=($3), fechaFin=($4), pvp=($5) WHERE id=($1)', 
                     [data.id, data.codigo_articulo, data.fechainicio, data.fechafin, data.pvp]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM wabaw.ofertas ORDER BY id DESC');
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
router.delete( '/api/v1/ofertas' + '/:id', (req, res, next) => {
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
        client.query('DELETE FROM wabaw.ofertas WHERE id=($1)', [id]);
        // SQL Query > Select Data
        var query = client.query('SELECT * FROM wabaw.ofertas ORDER BY id DESC');
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
