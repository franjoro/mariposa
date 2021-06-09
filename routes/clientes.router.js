const express = require('express');
const clientes = require("../controllers/clientes.controller");
const router = express.Router();




//  CLIENTES
/* GET home page. */
router.get('/', clientes.main);

/* GET API Obtener todos los clientes */
router.get('/get', clientes.getAllClientes);

/* POST Agregar un nuevo cliente*/ 
router.post('/new', clientes.insertNewCliente);

/* PUT actualizar cliente actual */ 
router.put('/edit', clientes.editCliente);

/* DELETE Borrar cliente*/ 
router.delete('/delete', clientes.deleteCliente);


// CONTACTOS

/* GET detalle Por cliente. */
router.get('/detalle/:clienteId', clientes.detalleCliente);

/* GET API Obtener todos los  contactos de un cliente */
router.get('/contactos/:idCliente', clientes.getContactsById);

/* PUT Editar contacto de cliente */
router.put('/contactos', clientes.editContactById);

/* PUT Editar contacto de cliente */
router.post('/newContact', clientes.insertNewContact);

/* DELETE Borrar contacto de clientes */
router.delete('/contactos', clientes.deleteContactById);



module.exports = router;
