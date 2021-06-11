const cotizaciones = {};

const pool = require("../models/db");

cotizaciones.main = async (req, res) => {
  try {
    let cotizaciones = pool.query(
      "SELECT ordenes.id_orden AS id , clientes.Nombre  AS cliente , ordenes.Fecha, ordenes.Total , ordenes.FechaValida FROM ordenes INNER JOIN clientes ON clientes.id_cliente = ordenes.id_cliente WHERE Estado = 1"
    );
    let clientes = pool.query("SELECT id_cliente, Nombre FROM clientes");
    const query = await Promise.all([cotizaciones, clientes]);

    cotizaciones = query[0];
    clientes = query[1];

    res.render("./cotizaciones/mainCotizaciones", { cotizaciones , clientes});
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};

cotizaciones.insertNewCotizacion = async (req, res) => {
  try {
    const { id_cliente,  FormaPago, FechaValida } = req.body;
    console.log(req.body);
    if (!id_cliente ||  !FormaPago || !FechaValida)
      throw "PARAMS_NOT_COMPLETE";
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();
      today = dd + '/' + mm + '/' + yyyy;
    await pool.query(
      "INSERT INTO ordenes(id_cliente, Fecha, Estado , Total, FormaPago, FechaValida) VALUES(?,?,1,0,?,?)",
      [id_cliente, today, FormaPago, FechaValida]
    );
    res.json({ status: true }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};

cotizaciones.deleteCotizacion = async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) throw "ID_NOT_EXIST";
      await pool.query("DELETE FROM ordenes WHERE id_orden = ?", [id]);
      res.json({ status: true }).status(200);
    } catch (error) {
      console.log(error);
      res.json({ status: false, error }).status(400);
    }
  };



module.exports = cotizaciones;
