// PROVEEDORES  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
$("#formProveedores").submit(async function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    try {
        loaderAlert();
        const query = await $.ajax({
            type: "POST",
            url: "/proveedores/new",
            data: data,
        });
        if (query.status) return location.reload();
    } catch (error) {
        console.log(error);
        newErrorMessage(error);
    }
});
$(".btnDeleteProveedores").on("click", async function () {
    const {id} = $(this).data();
    const alerta = await  deleteConfirmAlert("¿Deseá eliminar el proveedor?" , "Esta acción no podra ser deshecha")
    if(!alerta.isConfirmed) return
    try {
        loaderAlert();
        const query = await $.ajax({
            type: "DELETE",
            url: "/proveedores/delete",
            data: {id}
        });
        if(query.status) location.reload();
    } catch (error) {
        console.log(error);
        Swal.close()
        newErrorMessage(error);
    }
});
// CONTACTOS  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
// CLIENTES  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
$("#formProveedorContacto").submit(async function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    try {
        loaderAlert();
        const query = await $.ajax({
            type: "POST",
            url: "/proveedores/newContact",
            data: data,
        });
        if (query.status) return location.reload();
    } catch (error) {
        console.log(error);
        newErrorMessage(error);
    }
});
$(".btnDeleteContactProveedor").on("click", async function () {
    const {id} = $(this).data();
    const alerta = await  deleteConfirmAlert("¿Deseá eliminar el proveedor?" , "Esta acción no podra ser deshecha")
    if(!alerta.isConfirmed) return
    try {
        loaderAlert();
        const query = await $.ajax({
            type: "DELETE",
            url: "/proveedores/deleteContacto",
            data: {id}
        });
        if(query.status) location.reload();
    } catch (error) {
        console.log(error);
        Swal.close()
        newErrorMessage(error);
    }
});