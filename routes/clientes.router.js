const express = require('express');
const clientes = require("../controllers/clientes.controller");
const router = express.Router();



/* GET Obtener todos los clientes */
router.get('/', clientes.getAllClientes);

/* POST Agregar un nuevo cliente*/ 
router.post('/new', clientes.insertNewCliente);

/* PUT actualizar cliente actual */ 
router.put('/edit', clientes.editCliente);

/* DELETE Borrar cliente*/ 
router.delete('/delete', clientes.deleteCliente);


module.exports = router;
