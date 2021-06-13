const cotizaciones = {};

const pool = require("../models/db");

cotizaciones.main = async (req, res) => {
  try {
    let cotizaciones = pool.query(
      "SELECT ordenes.id_orden AS id , clientes.Nombre  AS cliente , ordenes.Fecha,  ordenes.FechaValida FROM ordenes INNER JOIN clientes ON clientes.id_cliente = ordenes.id_cliente WHERE Estado = 1"
    );
    let clientes = pool.query("SELECT id_cliente, Nombre FROM clientes");
    const query = await Promise.all([cotizaciones, clientes]);

    cotizaciones = query[0];
    clientes = query[1];

    res.render("./cotizaciones/mainCotizaciones", { cotizaciones, clientes });
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};

cotizaciones.mainOrdenes = async (req, res) => {
  try {
    let cotizaciones = pool.query(
      "SELECT ordenes.id_orden AS id , clientes.Nombre  AS cliente , ordenes.Fecha,  ordenes.FechaValida FROM ordenes INNER JOIN clientes ON clientes.id_cliente = ordenes.id_cliente WHERE Estado = 2"
    );
    let clientes = pool.query("SELECT id_cliente, Nombre FROM clientes");
    const query = await Promise.all([cotizaciones, clientes]);

    cotizaciones = query[0];
    clientes = query[1];

    res.render("./ordenes/mainOrdenes", { cotizaciones, clientes });
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};

cotizaciones.detalles = async (req, res) => {
  const { id } = req.params;
  try {
    let productos = pool.query(
      "SELECT union_ordenes_producto.id_union AS id , union_ordenes_producto.cantidad , productos.Nombre , productos.Precio ,productos.Venta  , productos.Descripcion , productos.id_producto FROM `union_ordenes_producto` INNER JOIN productos ON productos.id_producto = union_ordenes_producto.id_producto WHERE union_ordenes_producto.id_orden = ?",
      [id]
    );
    let materialesEnProductos = pool.query(
      "SELECT union_materiales_producto.id_material AS material_producto, union_materiales_producto.cantidad , union_materiales_producto.id_producto, (SELECT id_material FROM union_proovedor_material WHERE id_union = union_materiales_producto.id_material) AS Material , (SELECT Nombre FROM materiales WHERE id_material = Material) AS NombreMaterial FROM union_materiales_producto"
    );
    let todosMateriales = pool.query(
      "SELECT union_proovedor_material.id_union , materiales.Nombre  AS NombreMaterial, union_proovedor_material.Precio , proveedores.Nombre AS Proveedor FROM `union_proovedor_material` INNER JOIN materiales ON materiales.id_material = union_proovedor_material.id_material INNER JOIN proveedores ON proveedores.id_proveedor = union_proovedor_material.id_proveedor"
    );

    let datacliente = pool.query("SELECT (SELECT Nombre FROM clientes WHERE id_cliente = ordenes.id_cliente) As cliente FROM ordenes WHERE id_orden = ?" , [id]);
    const query = await Promise.all([
      productos,
      todosMateriales,
      materialesEnProductos,
      datacliente
    ]);
    productos = query[0];
    todosMateriales = query[1];
    materialesEnProductos = query[2];
    datacliente = query[3];
    const dataOrdenada = [];
    productos.forEach((producto) => {
      const arr = [];
      materialesEnProductos.forEach((material) => {
        if (producto.id_producto == material.id_producto) {
          arr.push({
            Nombre: material.NombreMaterial,
            cantidad: material.cantidad,
          });
        }
      });
      dataOrdenada.push({
        Nombre: producto.Nombre,
        Descripcion: producto.Descripcion,
        Precio: producto.Precio,
        materiales: arr,
        id_producto : producto.id_producto
      });
    });
    res.render("./cotizaciones/detalles", {
      dataOrdenada,
      todosMateriales,
      id_cotizacion: id,
      datacliente
    });
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};

cotizaciones.detallesOrdenes = async (req, res) => {
  const { id } = req.params;
  try {
    let productos = pool.query(
      "SELECT union_ordenes_producto.id_union AS id , union_ordenes_producto.cantidad , productos.Nombre , productos.Precio ,productos.Venta  , productos.Descripcion , productos.id_producto FROM `union_ordenes_producto` INNER JOIN productos ON productos.id_producto = union_ordenes_producto.id_producto WHERE union_ordenes_producto.id_orden = ?",
      [id]
    );
    let materialesEnProductos = pool.query(
      "SELECT union_materiales_producto.id_material AS material_producto, union_materiales_producto.cantidad , union_materiales_producto.id_producto, (SELECT id_material FROM union_proovedor_material WHERE id_union = union_materiales_producto.id_material) AS Material , (SELECT Nombre FROM materiales WHERE id_material = Material) AS NombreMaterial FROM union_materiales_producto"
    );
    let todosMateriales = pool.query(
      "SELECT union_proovedor_material.id_union , materiales.Nombre  AS NombreMaterial, union_proovedor_material.Precio , proveedores.Nombre AS Proveedor FROM `union_proovedor_material` INNER JOIN materiales ON materiales.id_material = union_proovedor_material.id_material INNER JOIN proveedores ON proveedores.id_proveedor = union_proovedor_material.id_proveedor"
    );

    let datacliente = pool.query("SELECT (SELECT Nombre FROM clientes WHERE id_cliente = ordenes.id_cliente) As cliente FROM ordenes WHERE id_orden = ?" , [id]);
    const query = await Promise.all([
      productos,
      todosMateriales,
      materialesEnProductos,
      datacliente
    ]);
    productos = query[0];
    todosMateriales = query[1];
    materialesEnProductos = query[2];
    datacliente = query[3];
    const dataOrdenada = [];
    productos.forEach((producto) => {
      const arr = [];
      materialesEnProductos.forEach((material) => {
        if (producto.id_producto == material.id_producto) {
          arr.push({
            Nombre: material.NombreMaterial,
            cantidad: material.cantidad,
          });
        }
      });
      dataOrdenada.push({
        Nombre: producto.Nombre,
        Descripcion: producto.Descripcion,
        Precio: producto.Precio,
        materiales: arr,
        id_producto : producto.id_producto
      });
    });
    res.render("./ordenes/detalles", {
      dataOrdenada,
      todosMateriales,
      id_cotizacion: id,
      datacliente
    });
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};
cotizaciones.insertNewCotizacion = async (req, res) => {
  try {
    const { id_cliente, FormaPago, FechaValida } = req.body;
    console.log(req.body);
    if (!id_cliente || !FormaPago || !FechaValida) throw "PARAMS_NOT_COMPLETE";
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
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


cotizaciones.aceptarorden = async (req, res) => {
  try {
    const { id :id_orden  } = req.body;
    if (!id_orden) throw "PARAMS_NOT_COMPLETE";
    await pool.query(
      "UPDATE ordenes SET Estado=2 WHERE id_orden = ?   ",
      [id_orden]
    );
    res.json({ status: true }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};



cotizaciones.insertNewProductoInCotizacion = async (req, res) => {
  try {
    const { material_id, cantidad, id_producto } = req.body;
    // if (!material_id || !cantidad || !id_cotizacion)
    //   throw "PARAMS_NOT_COMPLETE";
    let precioProducto = await pool.query(
      "SELECT Precio FROM productos WHERE id_producto = ? ",
      id_producto
    );
    let precioMaterial = await pool.query(
      "SELECT Precio FROM union_proovedor_material WHERE id_union = ? ",
      material_id
    );

    console.log(req.body);

    precioProducto = Number(precioProducto[0].Precio);
    precioMaterial = Number(precioMaterial[0].Precio);
    const PrecioToSumar = precioProducto + precioMaterial * Number(cantidad);

    await pool.query(
      "INSERT INTO union_materiales_producto(id_producto, id_material , cantidad) VALUES(?,?,?)",
      [id_producto, material_id, cantidad]
    );
    await pool.query("UPDATE productos SET Precio = ? WHERE id_producto = ?", [
      PrecioToSumar,
      id_producto,
    ]);

    res.json({ status: true }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};
cotizaciones.newMaterialInProducto = async (req, res) => {
  try {
    const { Nombre, Descripcion, id_cotizacion } = req.body;
    if (!Nombre || !Descripcion || !id_cotizacion) throw "PARAMS_NOT_COMPLETE";
    const { insertId } = await pool.query(
      "INSERT INTO productos(Nombre, Precio, Descripcion) VALUES(?,0,?)",
      [Nombre, Descripcion]
    );

    await pool.query(
      "INSERT INTO union_ordenes_producto(id_producto, id_orden, cantidad) VALUES(?,?,1)",
      [insertId, id_cotizacion]
    );

    console.log(insertId);
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
