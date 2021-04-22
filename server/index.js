// Creación del servidor con Express y Node
const express = require('express'); 

require('dotenv').config({path: './.env'});

const app = express();

app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto 4000...')
});

// Conexión a db
const client = require('./database');

//Creación de las tablas solicitadas
client.query('SELECT * from categorias', (err, res) => {
    if(!err){
        console.log(res.rows);
    }
    client.end();
})