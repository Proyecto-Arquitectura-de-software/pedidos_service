const express = require ('express');
const router = express.Router();
const connection = require('../database');
const bodyParser = require('body-parser');

router.use(bodyParser.json());


// Obteniendo todos los pedidos
router.get('/pedidos', async (req,res) => { 

    const query = 'select id,id_cliente, id_establecimiento, (select nombre from estado_pedido where id = id_estado) estado, observaciones, destino, fecha_inicio,fecha_fin from pedido;';

    await connection.query(query, (err, results) => { 
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

    const query = 'select id,id_cliente, id_establecimiento, (select nombre from estado_pedido where id = id_estado) estado, observaciones, destino, fecha_inicio,fecha_fin from pedido where id = ';

    await connection.query(query + req.params.id, (err, results) => { 
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

// Obteniendo los pedidos dados un establecimiento y un cliente  
router.get('/pedidos_cliente/:id_cliente/:id_establecimiento', async (req,res) => { 

    const query = 'select id,id_cliente, id_establecimiento, (select nombre from estado_pedido where id = id_estado) estado, observaciones, destino, fecha_inicio,fecha_fin from pedido where id_cliente = ? and id_establecimiento = ?';

    await connection.query(query, [req.params.id_cliente, req.params.id_establecimiento], (err, results) => { 
        if (err)
            {
                console.log('Error: ' + err);
                res.send(err);                
            }
        else
            {
                console.log('Consulta de cliente y establecimiento: ' + results);
                
                res.send(results);
            }
    })

});

// Creando un pedido nuevo
router.post('/pedidos', async (req, res) => {
    console.log('EL body: ' + req.body);
    const {id_cliente, id_establecimiento, id_estado, observaciones, destino} = req.body;
    const nuevoPedido = {        
        id_cliente,
        id_establecimiento,
        id_estado,
        observaciones,
        destino
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
    
});

// Actualizando un pedido exacto
router.post('/pedidos/:id', async (req, res) => {
    const { id } = req.params;
    const {id_cliente, id_establecimiento, id_estado, observaciones, destino} = req.body;
    const cambiosPedido = {        
        id_cliente,
        id_establecimiento,
        id_estado,
        observaciones,
        destino
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
    
});

// Eliminando un pedido exacto  
router.delete('/pedidos/:id', async (req,res) => { 
    
    await connection.query('DELETE FROM pedido where id = ' + req.params.id, (err, results) => { 
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
