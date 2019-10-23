
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Servidor en el puerto 3100. Para las peticiones usar la ruta /pedidos ');
});

module.exports = router;