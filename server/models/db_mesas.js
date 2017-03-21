const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';

var client = new pg.Client(connectionString);


// Creo la tabla
client.connect();
var query = client.query(
    'CREATE TABLE wabaw.mesas(id SERIAL PRIMARY KEY, idMesa VARCHAR(40) not null, nombreMesa VARCHAR(40) not null);'
);
query.on('end', () => { client.end(); });

// Fin