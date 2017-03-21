//
// wabaw2, versión redefinitiva
//
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

// var user = require('./routes/user');


// Lo pongo el 24/02, hay alguna cosa que cambia. Las lineas comentadas es porque están declaradas antes
// const express = require('express');
const router = express.Router();
const pg = require('pg');
// const path = require('path');
//const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
// Defino la cadena de conexión correcta en la base de datos que estoy utilizando
const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';

var dogs = require('./server/routes/dogs');
var cats = require('./server/routes/cats');
var mesas = require('./server/routes/mesas');
var usuarios = require('./server/routes/usuarios');
var empleados = require('./server/routes/empleados');
var articulos = require('./server/routes/articulos');
var articulosopiniones = require('./server/routes/articulosopiniones');
var imagenes = require('./server/routes/imagenes');
var posts = require('./server/routes/posts');
var ofertas = require('./server/routes/ofertas');

// Express
var app = express();
app.use('/dogs', dogs);
app.use('/cats', cats);
app.use('/mesas', mesas);
app.use('/usuarios', usuarios);
app.use('/empleados', empleados);
app.use('/articulosopiniones', articulosopiniones);
app.use('/articulos', articulos);
app.use('/imagenes', imagenes);
app.use('/posts', posts);
app.use('/ofertas', ofertas);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Configuración

// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);

// 27/02 puestas

app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// hasta aqui

app.use(express.static(path.join(__dirname, 'public')));



// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});
// respond with "hello world" when a GET request is made to the homepage
app.post('/', function(req, res) {
  res.send('cchello world');
});



// No se para lo que es. Copiado de angularcode http://angularcode.com/creating-rest-api-using-nodejs-and-consuming-in-angularjs/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Defino las rutas
// app.use('/api', require('./server/routes/api'));
// require('./server/routes')(app);


app.post('/api/v1/todos', (req, res, next) => {
    console.log('entro');
  const results = [];
  // Grab data from http request
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
    client.query('INSERT INTO WABAW.items(text, complete) values($1, $2)',
    [data.text, data.complete]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM WABAW.items ORDER BY id ASC');
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

app.get('/api/v1/todos', (req, res, next) => {
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
    const query = client.query('SELECT * FROM WABAW.items ORDER BY id ASC;');
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


http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

/*
var express = require('express');

var app = express();

var routes = require('./server/routes/todo');
var router = require('./server/router.js');


app.use(express.static(__dirname + '/public'));

// Puesto por lo de todo
// app.use('/', routes);


// app.get('*', function(req, res) {
//    res.sendFile('/public/index.html', { root: __dirname });
// });

app.listen(3000);
console.log('Iniciado servidor en el puerto 3000');

*/



