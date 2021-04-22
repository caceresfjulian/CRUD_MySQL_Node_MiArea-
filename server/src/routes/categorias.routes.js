const router = require('express').Router();
const client = require('../database');
let categorias = [];

// Obtener la lista de categorías
router.get('/', async (req, res) => {
    try {
        await client.connect();
        client.query('SELECT * FROM categorias', (err, result) => {
            console.log(result.rows);
            client.end();
            categorias = result.rows;
            res.json(categorias); 
        }); 
    }
    catch (error) {
        console.log(error);
    }
});

// Crear una categoría nueva
router.post('/', (req, res) => {

});

// Eliminar una
router.delete('/', (req, res) => {

});

// Modificar una categoría específica
router.put('/', (req, res) => {

});

module.exports = router;