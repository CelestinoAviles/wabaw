'use strict';

const _ = require('underscore');

//Database functions
const pg = require('pg');

let pool = new pg.Pool({
    user:     'postgres',
    password: '1234',
    host:     'localhost',
    database: 'postgres'
});

function runQuery(query, argsArray, callback) {
    pool.connect((err, client, done) => {
        if (err) {
            //likely a connection error that will print to console.
            done();
            throw err;
        }
        client.query(query, argsArray, (err, results) => {
            done(); //call done to release the client to the connection pool.
            callback(err, results); //make it the callers responsiblity for checking for query errors.
        });
    });
}

const yargs = require('yargs');

const args = yargs
    .alias('p', 'codigo_padre')
    .describe('p', 'Código Padre')
    .alias('c', 'codigo')
    .describe('c', 'Codigo')
    .alias('n', 'nombre')
    .describe('n', 'Nombre')
    .alias('e', 'estado')
    .describe('p', 'Estado')
    .alias('o', 'observaciones')
    .describe('o', 'observaciones')
    .alias('a', 'action')
    .demand('a')
    .describe('a', 'action to take [update, create, delete, list]')
    .argv;

if (args.action === 'create') {
    create(args);
} else if (args.action == 'update') {
    update(args);
} else if (args.action == 'delete') {
    remove(args);  
} else if (args.action == 'list') {
    list(args);  
} else {
    throw new Error('Action not supported');
}

function create(options) {
    let query = 'insert into wabaw.familias(codigo_padre, codigo, nombre, estado, observaciones) values ($1, $2, $3, $4, $5)';
    let args = [options.codigo_padre, options.codigo, options.nombre, options.estado, options.observaciones];
    runQuery(query, args, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.log(results);
        }
        process.exit();
    })
}

function update(options) {
    if (!options.codigo) {
        throw new Error('id is required for an update');
    }
    let fieldsToUpdate = [];
    let valuesToUpdate = [];
    if (options.codigo_padre) {
        fieldsToUpdate.push('codigo_padre');
        valuesToUpdate.push(options.codigo_padre);
    }
    if (options.codigo) {
        fieldsToUpdate.push('codigo');
        valuesToUpdate.push(options.codigo);
    }
    if (options.estado) {
        fieldsToUpdate.push('estado');
        valuesToUpdate.push(options.estado);
    }
    if (options.observaciones) {
        fieldsToUpdate.push('observaciones');
        valuesToUpdate.push(options.observaciones);
    }

    if (fieldsToUpdate.length === 0 || valuesToUpdate.length === 0) {
        throw new Error('no fields to update');
    }
    let placeHolderParams = (_.map(valuesToUpdate, (v, i) => {
        return `$${i + 1}`;
    })).join(', ');
    let idWhereClause = `where codigo = $${valuesToUpdate.length + 1}`;
    valuesToUpdate.push(options.codigo);
    let query = `update wabaw.familias set (${fieldsToUpdate.join(', ')}) = (${placeHolderParams}) ${idWhereClause}`;
    runQuery(query, valuesToUpdate, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
            if (result.rowCount === 0) {
                console.error('No record updated');
            }
        }
        process.exit();
    });
}

function remove(options) {
    let query = 'delete from wabaw.familias where codigo = $1';
    let args = [options.codigo];
    runQuery(query, args, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.log(results);
            console.log(options.codigo);
        }
        process.exit();
    })
}

function list(options) {
    let query = 'select codigo_padre, codigo, nombre, estado from wabaw.familias';
    let args = [];
    runQuery(query, args, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.log(results);
            
            console.log('codigo_padre', 'codigo', 'nombre', 'estado');
            _.each(results.rows, (r) => {
                console.log(r.codigo_padre, r.codigo, r.nombre, r.estado);
            });

        }
        process.exit();
    })
}




