const express = require('express');
const cotizaciones = require("../controllers/cotizaciones.controller");
const router = express.Router();



/* GET home page. */
router.get('/', cotizaciones.main);


/* POST Ingresar cotizaciones */
router.post("/newCotizacion", cotizaciones.insertNewCotizacion);

/* DELETE eliminar cotización */
router.delete("/delete", cotizaciones.deleteCotizacion);



module.exports = router;
