const express = require ('express');
const router = express.Router();
const connection = require('../database');
const bodyParser = require('body-parser');


router.use(bodyParser.json());


// Obteniendo todos los pedidos
router.get('/pedidos', async (req,res) => { 
    const pedidos = await connection.query('SELECT * FROM pedido', (err, results) => { 
        if (err)
            {
                console.log('Error: ' + err);
                res.send(err);
            }
        else
            {
                console.log('Consulta general con resultados: ' + results);
                res.send(results);
            }
    })

});

// Obteniendo un pedido exacto  
router.get('/pedidos/:id', async (req,res) => { 
    const pedidos = await connection.query('SELECT * FROM pedido where id = ' + req.params.id, (err, results) => { 
        if (err)
            {
                console.log('Error: ' + err);
                res.send(err);                
            }
        else
            {
                console.log('Consulta exacta con resultados: ' + results);
                res.send(results);
            }
    })

});

// Creando un pedido nuevo
router.post('/pedidos', async (req, res) => {
    console.log('EL body: ' + req.body);
    const { id, id_cliente, id_estado, observaciones} = req.body;
    const nuevoPedido = {
        id,
        id_cliente,
        id_estado,
        observaciones    
    };

    await connection.query('INSERT INTO pedido set ?', [nuevoPedido], (err, results) => { 
        if (err)
            {
                console.log('Error creando: ' + err);
                res.send(err);
            }
        else
            {
                console.log('Creacion con resultado: ' + results);
                res.send(results);
            }
    })
    //req.flash('success', 'Link Saved Successfully');
    //res.redirect('/links');
});

// Actualizando un pedido exacto
router.post('/pedidos/:id', async (req, res) => {
    const { id } = req.params;
    const {id_cliente, id_estado, observaciones} = req.body;
    const cambiosPedido = {        
        id_cliente,
        id_estado,
        observaciones    
    };
    console.log(cambiosPedido);
    await connection.query('UPDATE pedido set ? WHERE id = ?', [cambiosPedido, id], (err, results) => { 
        if (err)
            {
                console.log('Error actualizando: ' + err);
                res.send(err);
            }
        else
            {
                console.log('Actualizacion con resultado: ' + results);
                res.send(results);                
            }
    })
    //req.flash('success', 'Link Saved Successfully');
    //res.redirect('/links');
});

// Eliminando un pedido exacto  
router.delete('/pedidos/:id', async (req,res) => { 
    const pedidos = await connection.query('DELETE FROM pedido where id = ' + req.params.id, (err, results) => { 
        if (err)
            {
                console.log('Error: ' + err);
                res.send(err);
            }
        else
            {
                console.log('Eliminacion con resultado: ' + results);
                res.send(results);
            }
    })

});

module.exports = router;
