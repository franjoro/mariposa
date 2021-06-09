const index = {};
const pool = require("../models/db");
const { desincriptar } = require("../utils/decrypt");
const { firmar } = require("../middleware/auth")
index.main = (req ,res) => {
  res.render('index', { title: 'Express' });
}

// Login handler
index.signin = async (req, res) => {
 const {username , password} = req.body;
 try {
   // verificamos si existe el usuario y traemos data en caso si
   const data = await pool.query(
     "SELECT Usuario, Password FROM usuarios WHERE Usuario = ? ",
     username
     );
     // Error si no existe
     if (!Array.isArray(data) || !data.length)
     return res.status(400).json({ error: "ERROR_NOT_EXIST", status: false });
     
     // Verificamos contraseña
     if (!(await desincriptar(password, data[0].Password)))
     return res.status(400).json({ error: "ERROR_PASSWORD", status: false });
     // Creamos JWT
     const payload = data[0];
     const token = firmar(payload);
     console.log(token)
    res.cookie("token", token);
    console.log(res)
    return res.status(200).json({ status: true, role: data[0].Role });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error, status: false });
  }
};

module.exports =  index;