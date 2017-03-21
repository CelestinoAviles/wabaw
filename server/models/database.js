const pg = require('pg');

// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/postgress';

const connectionString = process.env.DATABASE_URL || 'postgres:postgres:1234@localhost:5432/postgres';

var client = new pg.Client(connectionString);

client.connect();

var query = client.query(
    'CREATE SCHEMA IF NOT EXISTS wabar AUTHORIZATION postgres;');

query.on('end', () => { client.end(); });

// client.connect();

var query = client.query(
    'CREATE SCHEMA IF NOT EXISTS wabas AUTHORIZATION postgres;');

var query = client.query(
    'CREATE TABLE SCHEMA IF NOT EXISTS wabas AUTHORIZATION postgres;');



query.on('end', () => { client.end(); });

/*

var pg = require('pg');
 
// create a config to configure both pooling behavior 
// and client options 
// note: all config is optional and the environment variables 
// will be read if the config is not present 
var config = {
  user: 'postgres', //env var: PGUSER 
  database: 'postgres', //env var: PGDATABASE 
  password: '1234', //env var: PGPASSWORD 
  port: 5432, //env var: PGPORT 
  max: 10, // max number of clients in the pool 
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
};
 
 
//this initializes a connection pool 
//it will keep idle connections open for a 30 seconds 
//and set a limit of maximum 10 idle clients 
var pool = new pg.Pool(config);
 
// to run a query we can acquire a client from the pool, 
// run a query on the client, and then return the client to the pool 
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
    //output: 1 
  });
    
client.query(
  'CREATE TABLE elementos(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');

    done();
    console.log('finaliza');
    
    
});
 
pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool 
  // the pool itself will emit an error event with both the error and 
  // the client which emitted the original error 
  // this is a rare occurrence but can happen if there is a network partition 
  // between your application and the database, the database restarts, etc. 
  // and so you might want to handle it and at least log it out 
  console.error('idle client error', err.message, err.stack)
})

*/


