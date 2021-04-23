const router = require('express').Router();
const client = require('../database');
let categorias = [];

// Obtener la lista de categorías.
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

// Crear una categoría nueva.
router.post('/', async (req, res) => {
    try {
        const { nombre_categoria } = req.body;

        // Verificar si existe otro registro con mismo nombre.
        const query = `SELECT * FROM categorias WHERE nombre_categoria='${nombre_categoria}';`;
        await client.connect();
        client.query(query, (err, result) => {
            if (result.rows.length > 0) {
                client.end();
                return res.status(401).send();
            } else {
                // Despues de verificado, se crea el registro.
                client.query(`INSERT INTO categorias (nombre_categoria) VALUES ('${nombre_categoria}')`,
                    (err, result) => {
                        client.end();
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
        await client.connect();
        client.query(query, (err, result) => {
            client.end();
            res
                .json({ mensaje: 'Registro eliminado.' })
                .status(204)
                .send();
        })
    }
    catch (error) {
        client.end();
        console.log(error);
    }
});

// Modificar una categoría específica
router.put('/', async (req, res) => {
    const nuevo_nombre = req.body.nombre_categoria;
    const id = req.body.id;
    const query = `UPDATE categorias SET nombre_categoria ='${nuevo_nombre}' WHERE id=${id}`;

    try {
        await client.connect();
        client.query(query, (err, result) => {
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