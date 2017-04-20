//
// wabaw2, versión redefinitiva
//
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

const router = express.Router();
const pg = require('pg');

// Defino la cadena de conexión correcta en la base de datos que estoy utilizando
const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';

var mesas = require('./server/routes/mesas');
var usuarios = require('./server/routes/usuarios');
var empleados = require('./server/routes/empleados');
var articulos = require('./server/routes/articulos');
var familias = require('./server/routes/familias');
var articulosopiniones = require('./server/routes/articulos_opiniones');
var articulos_imagenes = require('./server/routes/articulos_imagenes');
var imagenes = require('./server/routes/imagenes');
var posts = require('./server/routes/posts');
var ofertas = require('./server/routes/ofertas');
var tickets = require('./server/routes/tickets');
var ticketslineas = require('./server/routes/tickets_lineas');
var dispositivopreferencias = require('./server/routes/dispositivo_preferencias');
var llamada = require('./server/routes/llamada');

// Express
var app = express();
app.use('/mesas', mesas);
app.use('/usuarios', usuarios);
app.use('/empleados', empleados);
app.use('/articulosopiniones', articulosopiniones);
app.use('/articulosimagenes', articulos_imagenes);
app.use('/articulos', articulos);
app.use('/familias', familias);
app.use('/imagenes', imagenes);
app.use('/posts', posts);
app.use('/ofertas', ofertas);
app.use('/tickets', tickets);
app.use('/ticketsLineas', ticketslineas);
app.use('/dispositivopreferencias', dispositivopreferencias);
app.use('/llamada', llamada);


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json()); // for parsing application/json

app.use(express.static(path.join(__dirname, 'public')));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

// No se para lo que es. Copiado de angularcode http://angularcode.com/creating-rest-api-using-nodejs-and-consuming-in-angularjs/
// Modificacion para ver si lo graba en GITHUB

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
