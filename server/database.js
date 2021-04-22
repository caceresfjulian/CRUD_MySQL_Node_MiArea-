// conexión a db

const {Client} = require('pg');

const client = new Client ({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

client.connect().then( db => console.log('Tamo en vivo.')).catch(err => console.log(err));

module.exports = client; 