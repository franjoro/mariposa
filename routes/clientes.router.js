const express = require('express');
const clientes = require("../controllers/clientes.controller");
const router = express.Router();



/* GET Obtener todos los clientes */
router.get('/get', clientes.getAllClientes);

/* POST Agregar un nuevo cliente*/ 
router.post('/new', clientes.insertNewCliente);

/* PUT actualizar cliente actual */ 
router.put('/edit', clientes.editCliente);

/* DELETE Borrar cliente*/ 
router.delete('/delete', clientes.deleteCliente);

/* GET Obtener todos los  contactos de un cliente */
router.get('/contactos/:idCliente', clientes.getContactsById);

/* PUT Editar contacto de cliente */
router.put('/contactos', clientes.editContactById);

/* DELETE Borrar contacto de clientes */
router.delete('/contactos', clientes.editContactById);


/* GET Obtener todos los clientes TABLA */
router.get('/', clientes.getAllClientesTabla);

module.exports = router;
