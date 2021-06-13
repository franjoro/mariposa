const express = require('express');
const index = require("../controllers/index.controller");
const router = express.Router();



/* GET home page. */
router.get('/', index.main);

/* GET home page. */
router.get('/home', index.mainHome);

/* GET home page. */
router.post("/signin", index.signin);





module.exports = router;
