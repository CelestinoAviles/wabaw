const pg = require('pg');

// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/postgress';

const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';

var client = new pg.Client(connectionString);


// Elimino la tabla
 
/* client.connect();
var query = client.query(
    'DROP TABLE wabaw.items;'
);
query.on('end', () => { client.end(); });

*/
console.log('hh');


// Creo la tabla
client.connect();
var query = client.query(
    'CREATE TABLE wabaw.items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN);'
);
query.on('end', () => { client.end(); });

// Fin