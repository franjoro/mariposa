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


clientes.getContactsById = async (req, res) => {
    try {
        const {idCliente} = req.params;
        if(!idCliente)  throw 'PARAMS_NOT_COMPLETE';
        const clientes = await pool.query("SELECT * FROM contacto_cliente WHERE id_cliente = ?", [idCliente]);
        res.json({ status: true, clientes }).status(200);
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
}


clientes.editContactById = async (req, res) => {
    try {
        const { Nombre, Tel, Email , Cargo , id } = req.body;
        console.log(req.body)
        if (!id) throw 'ID_NOT_EXIST';
        // if (!Nombre ||  !Tel || !Email || !Cargo) throw 'PARAMS_NOT_COMPLETE';
        await pool.query("UPDATE contacto_cliente SET Nombre = ? , Tel = ? , Email = ?, Cargo = ? WHERE id_contacto = ?  ", [Nombre, Tel, Email  , Cargo, id]);
        res.json({ status: true }).status(200);
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
}

clientes.deleteContactById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) throw 'ID_NOT_EXIST';
        await pool.query("DELETE FROM contacto_cliente WHERE id_contacto = ?", [id]);
        res.json({ status: true }).status(200);
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
}


clientes.getAllClientesTabla = async (req, res) => {
    try {
        const clientes = await pool.query("SELECT * FROM clientes");
        console.log(clientes)
        res.render("index",{clientes})
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
}

module.exports = clientes;