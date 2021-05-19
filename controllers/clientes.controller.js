const clientes = {};
const pool = require("../models/db");

clientes.getAllClientes = async (req, res) => {
    try {
        const clientes = await pool.query("SELECT * FROM clientes");
        res.json({ status: true, clientes }).status(200);
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
}

clientes.insertNewCliente = async (req, res) => {
    try {
        const { Nombre, Direccion, Telefono, Email } = req.body;
        if (!Nombre || !Direccion || !Telefono || !Email) throw 'PARAMS_NOT_COMPLETE';
        await pool.query("INSERT INTO clientes(Nombre,Direccion,Tel,Email) VALUES(?,?,?,?)", [Nombre, Direccion, Telefono, Email]);
        res.json({ status: true }).status(200);
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
}

clientes.editCliente = async (req, res) => {
    try {
        const { Nombre, Direccion, Telefono, Email , id } = req.body;
        if (!id) throw 'ID_NOT_EXIST';
        if (!Nombre || !Direccion || !Telefono || !Email) throw 'PARAMS_NOT_COMPLETE';
        await pool.query("UPDATE clientes SET Nombre = ? , Direccion = ? , Tel = ?, Email = ? WHERE id_cliente = ?  ", [Nombre, Direccion, Telefono, Email , id]);
        res.json({ status: true }).status(200);
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
}

clientes.deleteCliente = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) throw 'ID_NOT_EXIST';
        await pool.query("DELETE FROM clientes WHERE id_cliente = ?", [id]);
        res.json({ status: true }).status(200);
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
}

module.exports = clientes;