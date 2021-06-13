const express = require('express');
const cotizaciones = require("../controllers/cotizaciones.controller");
const router = express.Router();




// ----------- ORDENES
/* GET home page. */
router.get('/ordenes', cotizaciones.mainOrdenes);
router.get('/ordenes/detalles/:id', cotizaciones.detallesOrdenes);



// ----------- COTIZACIONES

/* GET home page. */
router.get('/', cotizaciones.main);

/* GET home page. */
router.get('/detalles/:id', cotizaciones.detalles);

/* POST Ingresar cotizaciones */
router.post("/newCotizacion", cotizaciones.insertNewCotizacion);

/* DELETE eliminar cotización */
router.delete("/delete", cotizaciones.deleteCotizacion);

/* POST Ingresar cotizaciones */
router.put("/aceptarCotizacion", cotizaciones.aceptarorden);

// ------ PRODUCTOS

/* POST Ingresar producto de cotizaciones */
router.post("/newProducto", cotizaciones.newMaterialInProducto);

/* POST Ingresar producto de cotizaciones */
router.post("/newMaterialInProducto", cotizaciones.insertNewProductoInCotizacion);

module.exports = router;
