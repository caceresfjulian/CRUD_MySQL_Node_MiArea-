// Creación del servidor con Express y Node
const express = require('express');

require('dotenv').config({ path: './.env' });

const app = express();

const cors = require('cors');

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))

// Conexión a db
// require('./src/database');

// Creación de las tablas solicitadas
// client.query('SELECT * from categorias', (err, res) => {
//     if(!err){
//         console.log(res.rows);
//     }
//     client.end();
// })
app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto', process.env.PORT);
});

app.use('/api/', require('./src/routes/api.routes'));
app.use('/categorias/', require('./src/routes/categorias.routes'));
app.use('/articulos/', require('./src/routes/articulos.routes'));

