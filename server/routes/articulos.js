// 
// OPERACIONES EN SERVIDOR DE UNA ENTIDAD: *********  ARTICULOS   *********
// 

console.log('Articulos');

var express = require('express');
var router = express.Router();
var path = require('path');

const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var glbApi = '/api/v1/articulos';

// console.log(glbApi);

router.use(bodyParser.json());                          // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded


// 
// ALTA 
//
router.post('/api/v1/articulos', (req, res, next) => {
    const results = [];
    // Graba datos from http request
    const data = { codigo_articulo: req.body.codigo_articulo, 
                   nombre: req.body.nombre,
                   descripcion: req.body.descripcion,
                   cod_familia: req.body.cod_familia,
                   pvp_venta: req.body.pvp_venta,
                   stock_actual: req.body.stock_actual
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
        client.query('INSERT INTO wabaw.articulos(CODIGO_ARTICULO, NOMBRE, DESCRIPCION, COD_FAMILIA, PVP_VENTA, STOCK_ACTUAL) values($1,$2,$3,$4, $5, $6)',
                     [data.codigo_articulo, data.nombre, data.descripcion, data.cod_familia, data.pvp_venta, data.stock_actual ]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM wabaw.articulos ORDER BY nombre ASC');
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
router.get( '/api/v1/articulos', (req, res, next) => {
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
    const query = client.query('SELECT * FROM wabaw.articulos ORDER BY nombre ASC;');
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
// LEER DATOS DE UN ARTICULO
//
router.get( '/api/v1/articulos/:id', (req, res, next) => {
  const results = [];
    id = req.params.id;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM wabaw.articulos WHERE CODIGO = ($1) ORDER BY nombre ASC;', [id]);
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
// LEER DATOS DE ARTICULOS QUE PERTENECEN A UNA FAMILIA
//
router.get( '/api/v1/articulos-ver/:id', (req, res, next) => {
  const results = [];
    var codFami = req.params.id;
    console.log('Familia que llega:' + codFami)
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
//        var aux = 'SELECT AI.CODIGO, AI.CODIGO_ARTICULO, A.NOMBRE, A.PVP_VENTA, AI.CODIGO_IMAGEN, I.URL, AI.NUMERO_ORDEN ' 
//        aux = aux + ' FROM wabaw.Articulos_IMAGENES AS AI, '
//        aux = aux + ' wabaw.articulos as A, '
//        aux = aux + ' wabaw.imagenes as I '
//        aux = aux + ' where AI.CODIGO_ARTICULO = A.CODIGO '
//        aux = aux + ' AND AI.CODIGO_IMAGEN = I.CODIGO '
//        aux = aux + ' AND AI.NUMERO_ORDEN = 1 '
//        aux = aux + ' AND A.COD_FAMILIA = ($1) '
//       aux = aux + ' ORDER BY A.NOMBRE, A.PVP_VENTA ASC'

        var aux = 'SELECT A.CODIGO, A.CODIGO_ARTICULO, A.NOMBRE, A.PVP_VENTA, AI.CODIGO_IMAGEN, AI.NUMERO_ORDEN, I.URL'
        aux = aux + ' FROM wabaw.articulos as A';
        aux = aux + ' left OUTER JOIN WABAW.ARTICULOS_IMAGENES AI';
        aux = aux + ' ON (AI.CODIGO_ARTICULO = A.CODIGO )';
        aux = aux + ' left OUTER JOIN WABAW.IMAGENES I';
        aux = aux + ' ON (AI.CODIGO_IMAGEN = I.CODIGO )';
        aux = aux + ' where  A.COD_FAMILIA = ($1) ';
//        aux = aux + '   AND  AI.NUMERO_ORDEN = 1 ';
        aux = aux + ' ORDER BY A.NOMBRE, A.PVP_VENTA ASC;';
      
        console.log(aux);  
        const query = client.query( aux, [ codFami ] );
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
router.put( '/api/v1/articulos/:id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.id;
    // Graba datos from http request
    const data = {codigo: id, 
                  codigo_articulo: req.body.codigo_articulo, 
                  nombre: req.body.nombre, 
                  descripcion: req.body.descripcion,
                  cod_familia: req.body.cod_familia,
                  stock_actual: req.body.stock_actual,
                  pvp_venta: req.body.pvp_venta
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
        client.query('UPDATE wabaw.articulos SET codigo_articulo=($2), nombre=($3), descripcion=($4), PVP_VENTA=($5), COD_FAMILIA = ($6), STOCK_ACTUAL = ($7) WHERE codigo=($1)', 
                     [data.codigo, data.codigo_articulo, data.nombre, data.descripcion, data.pvp_venta, data.cod_familia, data.stock_actual]);
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM wabaw.articulos ORDER BY nombre ASC");
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
router.delete( '/api/v1/articulos' + '/:id', (req, res, next) => {
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
        client.query('DELETE FROM wabaw.articulos WHERE codigo=($1)', [id]);
        // SQL Query > Select Data
        var query = client.query('SELECT * FROM wabaw.articulos ORDER BY nombre ASC');
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
