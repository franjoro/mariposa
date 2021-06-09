const proveedor = {};
const pool = require("../models/db");


proveedor.main = async (req ,res) => {
    try {
        const proveedores = await pool.query("SELECT * FROM proveedores");
        res.render('./proveedores/mainProveedores', { proveedores });
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
  }


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
        await pool.query("DELETE FROM proveedores WHERE id_proveedor  = ?", [id]);
        res.json({ status: true }).status(200);
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
}


proveedor.detalleProveedor = async (req ,res) => {
    const {proveId} = req.params;
    try {
        let contactos =  pool.query("SELECT * FROM  contacto_proveedor WHERE id_proveedor = ? " , [proveId]);
        let detalles =   pool.query("SELECT * FROM proveedores WHERE id_proveedor  = ? " , [proveId]);
        const query = await Promise.all([contactos, detalles]);
        contactos = query[0];
        detalles = query[1][0];
        res.render('./proveedores/detalleProveedores', { contactos, detalles  , proveId});
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
  }


  proveedor.insertNewContact = async (req, res) => {
    try {
        const { Nombre, Tel, Email, Cargo, id_proveedor } = req.body;
        if (!Nombre || !id_proveedor ) throw 'PARAMS_NOT_COMPLETE';
        await pool.query("INSERT INTO contacto_proveedor(Nombre, Tel, Email, Cargo, id_proveedor) VALUES(?,?,?,?,?)", [Nombre, Tel, Email, Cargo , id_proveedor]);
        res.json({ status: true }).status(200);
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
}

proveedor.deleteContactById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) throw 'ID_NOT_EXIST';
        await pool.query("DELETE FROM contacto_proveedor WHERE id_contacto = ?", [id]);
        res.json({ status: true }).status(200);
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
}

module.exports = proveedor;