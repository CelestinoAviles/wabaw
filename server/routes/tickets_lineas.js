// 
// OPERACIONES EN SERVIDOR DE UNA ENTIDAD: *********  TICKETS_LINEAS   *********
// 

console.log('Tickets_lineas');

var express = require('express');
var router = express.Router();
var path = require('path');

const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var glbApi = '/api/v1/ticketslineas';

// 'SELECT * FROM wabaw.tickets_lineas ORDER BY codigo ASC;'
var glbConsulta= 'select a.* , t.* from wabaw.tickets_lineas T, wabaw.articulos a where t.cod_articulo = a.codigo';
var glbConsultaOrdenada = glbConsulta + ' order by t.codigo ASC';

router.use(bodyParser.json());                          // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded

// 
// ALTA 
//
router.post( glbApi, (req, res, next) => {
    const results = [];
    // Graba datos from http request
    const data = { codigo:       req.body.codigo, 
                   cod_ticket:   req.body.cod_ticket,
                   cod_articulo: req.body.cod_articulo,
                   cantidad:     req.body.cantidad,
                   pvu:          req.body.pvu,
                   total:        req.body.total,
                   estado:       req.body.estado
                 };

    if (data.estado == null ) {
      data.estado = 'PEDIDO';  
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
        client.query('INSERT INTO wabaw.tickets_lineas(COD_TICKET, COD_ARTICULO, CANTIDAD, PVU, TOTAL, ESTADO) values($1, $2, $3, $4, $5, $6 )',
                     [ data.cod_ticket, data.cod_articulo, data.cantidad, data.pvu, data.total, data.estado ]);
        // SQL Query > Select Data

        aux = glbConsulta + ' and t.cod_ticket = ($1)'
        console.log (aux);
        console.log (data.cod_ticket);
    
        const query = client.query( aux, [data.cod_ticket] );
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
    const query = client.query( glbConsultaOrdenada );
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
// LEER LINEAS PENDIENTES DE SERVIR
//
router.get( glbApi + '/camarero', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
    
    var glbConsulta= 'select m.codigo codigo_mesa, m.nombre nombre_mesa, m.llamada, l.codigo, l.cod_ticket, l.cod_articulo, l.cantidad, l.pvu, l.total, L.ESTADO, a.nombre, a.cod_familia' 
    glbConsulta = glbConsulta + ' from wabaw.mesas M, wabaw.tickets T, wabaw.tickets_lineas L, wabaw.articulos A '
    glbConsulta = glbConsulta + ' where L.cod_articulo = A.codigo';
    glbConsulta = glbConsulta + ' and   L.cod_ticket   = T.codigo';
    glbConsulta = glbConsulta + ' and   M.codigo       = T.cod_espacio';
    glbConsulta = glbConsulta + ' and  ( T.estado is null OR LENGTH(T.ESTADO)=0)';
    glbConsulta = glbConsulta + ' and  ( L.estado in (\'PEDIDO\', \'PREPARADO\', \'EN CURSO\'))';
    var glbConsultaOrdenada = glbConsulta + ' order by l.estado ASC';
    console.log(glbConsulta);
    
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query( glbConsultaOrdenada );
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
// LEER LINEAS PENDIENTES DE SERVIR DEL COCINERO
//
router.get( glbApi + '/cocinero', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
    
    var glbConsulta= 'select m.nombre nombre_mesa, l.codigo, l.cod_ticket, l.cod_articulo, l.cantidad, l.pvu, l.total, L.ESTADO, a.nombre, a.cod_familia' 
    glbConsulta = glbConsulta + ' from wabaw.mesas M, wabaw.tickets T, wabaw.tickets_lineas L, wabaw.articulos A '
    glbConsulta = glbConsulta + ' where L.cod_articulo = A.codigo';
    glbConsulta = glbConsulta + ' and   L.cod_ticket   = T.codigo';
    glbConsulta = glbConsulta + ' and   M.codigo       = T.cod_espacio';
    glbConsulta = glbConsulta + ' and   l.estado in (\'COCINA\',\'COCINANDO\' )';
    var glbConsultaOrdenada = glbConsulta + ' order by l.cod_ticket ASC';
    console.log(glbConsulta);
    
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query( glbConsultaOrdenada );
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
// LEER LINEAS DE UN TICKET
//
router.get( glbApi+"/:id", (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.id;
    console.log(id);
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

        // SQL Query > Select
        client.query(glbConsulta + ' AND t.cod_ticket=($1)  ORDER BY T.CODIGO ASC', [id]);
      // SQL Query > Select Data
    const query = client.query( glbConsulta + ' AND t.cod_ticket=($1) ORDER BY T.CODIGO ASC', [id]);
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
    const data = { codigo:       req.body.codigo, 
                   cod_ticket:   req.body.cod_ticket,
                   cod_articulo: req.body.cod_articulo,
                   cantidad:     req.body.cantidad,
                   pvu:          req.body.pvu,
                   total:        req.body.total,
                   estado:       req.body.estado
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
        client.query('UPDATE wabaw.tickets_lineas SET cod_ticket = ($2), cod_articulo = ($3), cantidad = ($4), pvu = ($5), total = ($6), estado = ($7) WHERE codigo=($1)', [id, data.cod_ticket, data.cod_articulo, data.cantidad, data.pvu, data.total, data.estado ]);

    
        // SQL Query > Select Data
        const query = client.query( glbConsultaOrdenada );
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
    console.log('borro linea de ticket');
    console.log(id);
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query('DELETE FROM wabaw.tickets_lineas WHERE codigo=($1)', [id]);
        // SQL Query > Select Data
        
//      aux = glbConsulta + ' and t.cod_ticket = ($1)'
        aux = glbConsulta;
        console.log(aux);
        console.log(id);
        
//  Lo quito 29/08
//        var query = client.query( aux );
//
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
