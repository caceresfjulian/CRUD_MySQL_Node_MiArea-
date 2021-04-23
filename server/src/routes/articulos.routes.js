const router = require('express').Router();
const pool = require('../database');

// Crear un aticulo nuevo.
router.post('/', (req, res) => {
    try {
        const { numero_registro, nombre, descripcion } = req.body;

        // Verificar si existe otro registro con mismo numero de registro.
        const query = `SELECT * FROM articulos WHERE numero_registro=${numero_registro};`;
        pool.query(query, (err, result) => {
            if (result.rows.length > 0) {
                return res.status(401).send();
            } else {
                // Despues de verificado, se crea el registro.
                pool.query(`INSERT INTO articulos (numero_registro, nombre, descripcion) VALUES (${numero_registro}, '${nombre}', '${descripcion}')`,
                    (err, result) => {
                        return res
                            .json({ mensaje: `Artículo ${numero_registro} creado.` })
                            .status(201)
                            .send();
                    })
            }
        })
    } catch (error) {
        console.log(error);
    }
});

// Eliminar un artículo. 
router.delete('/:id', async (req, res) => {

    const id = req.params.id;
    const query = `DELETE FROM articulos WHERE id = ${id}`;
    try {
        pool.query(query, (err, result) => {
            res.json({ mensaje: 'Artículo eliminado.' });
        })
    }
    catch (error) {
        console.log(error);
    }
});

// Modificar un artículo específico.
router.put('/', async (req, res) => {
    
    const nuevo_numero_registro = req.body.numero_registro;
    const nuevo_nombre = req.body.nombre;
    const nuevo_descripcion = req.body.descripcion;
    const id = req.body.id;
    const query = `UPDATE articulos SET numero_registro =${nuevo_numero_registro}, nombre ='${nuevo_nombre}', descripcion='${nuevo_descripcion}' WHERE id=${id}`;

    try {
        pool.query(query, (err, result) => {
            if (!err) {
                res
                    .json({ mensaje: `Artículo actualizado a ${nuevo_numero_registro}` })
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