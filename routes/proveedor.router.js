const express = require('express');
const proveedor = require("../controllers/proveedor.controller");
const router = express.Router();


/* GET home page. */
router.get('/', proveedor.main);

/* GET Obtener todos los proveedores */
router.get('/get', proveedor.getAllProveedores);

/* POST Agregar un nuevo proveedor*/ 
router.post('/new', proveedor.insertNewProovedor);

/* PUT actualizar provedor actual */ 
router.put('/edit', proveedor.editProveedor);

/* DELETE Borrar proveedor*/ 
router.delete('/delete', proveedor.deleteProovedor);


// CONTACTOS

/* GET detalle Por cliente. */
router.get('/detalle/:proveId', proveedor.detalleProveedor);


// /* PUT Editar contacto de cliente */
// router.put('/contactos', clientes.editContactById);

// /* POST agregar nuevo contacto de proveedor */
router.post('/newContact', proveedor.insertNewContact);

// /* DELETE Borrar contacto de proveedor */
router.delete('/deleteContacto', proveedor.deleteContactById);


module.exports = router;
