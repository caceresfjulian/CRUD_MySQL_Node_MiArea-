const router = require('express').Router();
const pool = require('../database');
let categorias = [];
let articulos = [];

router.get('/categorias', (req, res) => {
    try {
        pool.query('SELECT * FROM categorias', (err, result) => {
            categorias = result.rows;
            res.json(categorias);
        });
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/articulos', async (req, res) => {
    try {
        pool.query('SELECT * FROM articulos', (err, result) => {
            articulos = result.rows;
            res.json(articulos);
        });
    }
    catch (error) {
        console.log(error);
    }
});


module.exports = router;