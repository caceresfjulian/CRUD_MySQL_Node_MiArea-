const express = require('express'); 

// const cors = require('cors');

require('dotenv').config({path: './.env'});

const app = express();

require('./database');

app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto 4000...')
});