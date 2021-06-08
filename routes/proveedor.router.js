const express = require('express');
const proveedor = require("../controllers/proveedor.controller");
const router = express.Router();



/* GET Obtener todos los proveedores */
router.get('/get', proveedor.getAllProveedores);

/* POST Agregar un nuevo proveedor*/ 
router.post('/new', proveedor.insertNewProovedor);

/* PUT actualizar provedor actual */ 
router.put('/edit', proveedor.editProveedor);

/* DELETE Borrar proveedor*/ 
router.delete('/delete', proveedor.deleteProovedor);


module.exports = router;
