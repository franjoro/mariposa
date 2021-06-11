const materiales = {};
const pool = require("../models/db");

materiales.main = async (req, res) => {
  try {
    const materiales = await pool.query("SELECT * FROM materiales");
    res.render("./materiales/modeloMateriales", { materiales });
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};

materiales.proveedores = async (req, res) => {
  try {
    let materiales =  pool.query("SELECT Nombre, id_material FROM materiales");
    let proveedores =  pool.query("SELECT Nombre, id_proveedor FROM proveedores");
    let materialesToTable =  pool.query("SELECT union_proovedor_material.id_union AS id, union_proovedor_material.Precio AS Precio, proveedores.Nombre AS proveedor ,  materiales.Nombre AS material FROM union_proovedor_material INNER JOIN  proveedores ON proveedores.id_proveedor = union_proovedor_material.id_proveedor INNER JOIN  materiales ON materiales.id_material = union_proovedor_material.id_material   ");
    const query = await Promise.all([materiales, proveedores, materialesToTable]);
    materiales = query[0];
    proveedores = query[1];
    materialesToTable = query[2];
    console.log(materialesToTable);
    res.render("./materiales/materialesProveedores", { materiales , proveedores , materialesToTable});
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};

materiales.insertNewMaterial = async (req, res) => {
  try {
    const { Nombre, Descripcion } = req.body;
    if (!Nombre) throw "PARAMS_NOT_COMPLETE";
    await pool.query("INSERT INTO materiales(Nombre,Descripcion) VALUES(?,?)", [
      Nombre,
      Descripcion,
    ]);
    res.json({ status: true }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};


materiales.insertNewMaterialProveedor = async (req, res) => {
  try {
    const { Precio, id_proveedor, id_material } = req.body;
    if (!id_proveedor || !id_material  || !Precio) throw "PARAMS_NOT_COMPLETE";
    await pool.query("INSERT INTO union_proovedor_material(Precio, id_proveedor, id_material ) VALUES( ? , ? , ?)", [
      Precio,
      id_proveedor,
      id_material
    ]);
    res.json({ status: true }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};


materiales.deleteMaterial = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) throw "ID_NOT_EXIST";
    await pool.query("DELETE FROM materiales WHERE id_material = ?", [id]);
    res.json({ status: true }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};

materiales.deleteMaterialProveedor = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) throw "ID_NOT_EXIST";
    await pool.query("DELETE FROM union_proovedor_material WHERE id_union = ?", [id]);
    res.json({ status: true }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};

module.exports = materiales;
