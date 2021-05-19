const index = {};
const pool = require("../models/db");

index.main = (req ,res) => {
  res.render('index', { title: 'Express' });
}


module.exports =  index;