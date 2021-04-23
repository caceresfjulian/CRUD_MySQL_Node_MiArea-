const router = require('express').Router();
const pool = require('../database');

// Crear una categoría nueva.
router.post('/', (req, res) => {
    try {
        const { nombre_categoria } = req.body;

        // Verificar si existe otro registro con mismo nombre.
        const query = `SELECT * FROM categorias WHERE nombre_categoria='${nombre_categoria}';`;
        pool.query(query, (err, result) => {
            if (result.rows.length > 0) {
                return res.status(401).send();
            } else {
                // Despues de verificado, se crea el registro.
                pool.query(`INSERT INTO categorias (nombre_categoria) VALUES ('${nombre_categoria}')`,
                    (err, result) => {
                        return res
                            .json({ mensaje: `Categoría ${nombre_categoria} creada.` })
                            .status(201)
                            .send();
                    })
            }
        })
    } catch (error) {
        console.log(error);
    }
});

// Eliminar una categoría 
router.delete('/:id', async (req, res) => {

    const id = req.params.id;
    const query = `DELETE FROM categorias WHERE id = ${id}`;
    try {
        pool.query(query, (err, result) => {
            res.json({ mensaje: 'Registro eliminado.' });
        })
    }
    catch (error) {
        console.log(error);
    }
});

// Modificar una categoría específica
router.put('/', async (req, res) => {
    const nuevo_nombre = req.body.nombre_categoria;
    const id = req.body.id;
    const query = `UPDATE categorias SET nombre_categoria ='${nuevo_nombre}' WHERE id=${id}`;

    try {
        pool.query(query, (err, result) => {
            if (!err) {
                res
                    .json({ mensaje: `Categoría actualizada a ${nuevo_nombre}` })
                    .status(200)
                    .send();
            } else {
                console.log(err);
            }
        })
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;