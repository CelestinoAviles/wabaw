/* Modelo */


const pg = require('pg');
const path = require('path');

//
// Inicializo la cadena de conexión 
//
const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';


//creamos un objeto para ir almacenando todo lo que necesitemos
var todoModel = {};

//obtenemos todos los usuarios
todoModel.getTodos = function(callback) {
    if (connection) {
        connection.query('SELECT * FROM wabaw.items ORDER BY id ASC;', function(error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}