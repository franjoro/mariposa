const proveedor = {};
const pool = require("../models/db");

proveedor.getAllProveedores = async (req, res) => {
    try {
        const proveedores = await pool.query("SELECT * FROM proveedores");
        res.json({ status: true, proveedores }).status(200);
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
}

proveedor.insertNewProovedor = async (req, res) => {
    try {
        const { Nombre, Direccion, Telefono, Email } = req.body;
        if (!Nombre || !Direccion || !Telefono || !Email) throw 'PARAMS_NOT_COMPLETE';
        await pool.query("INSERT INTO proveedores(Nombre,Direccion,Tel,Email) VALUES(?,?,?,?)", [Nombre, Direccion, Telefono, Email]);
        res.json({ status: true }).status(200);
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
}

proveedor.editProveedor = async (req, res) => {
    try {
        const { Nombre, Direccion, Telefono, Email , id } = req.body;
        if (!id) throw 'ID_NOT_EXIST';
        if (!Nombre || !Direccion || !Telefono || !Email) throw 'PARAMS_NOT_COMPLETE';
        await pool.query("UPDATE proveedores SET Nombre = ? , Direccion = ? , Tel = ?, Email = ? WHERE id_proveedor  = ?  ", [Nombre, Direccion, Telefono, Email , id]);
        res.json({ status: true }).status(200);
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
}

proveedor.deleteProovedor= async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) throw 'ID_NOT_EXIST';
        await pool.query("DELETE FROM clientes WHERE id_proveedor  = ?", [id]);
        res.json({ status: true }).status(200);
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
}

module.exports = proveedor;