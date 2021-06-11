const express = require('express');
const materiales = require("../controllers/materiales.controller");
const router = express.Router();




/* GET Catalogo de materiales. */
router.get('/', materiales.main);

/* POST Agregar nuevo material en el catalogo */
router.post('/new', materiales.insertNewMaterial);

/* DELETE Borra material del catalogo*/
router.delete('/delete', materiales.deleteMaterial);

// PROVEEDORES

/* GET materiales proveedores. */
router.get('/proveedores', materiales.proveedores);

/* POST Agregar nuevo material del proveedor */
router.post('/newMaterialProveedor', materiales.insertNewMaterialProveedor);

/* DELETE Borra material del catalogo*/
router.delete('/deleteMaterialProveedor', materiales.deleteMaterialProveedor);

module.exports = router;
