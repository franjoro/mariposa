// CLIENTES  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
$("#formClientes").submit(async function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    try {
        loaderAlert();
        const query = await $.ajax({
            type: "POST",
            url: "/clientes/new",
            data: data,
        });
        if (query.status) return location.reload();
    } catch (error) {
        console.log(error);
        newErrorMessage(error);
    }
});
$(".btnDeleteClientes").on("click", async function () {
    const {id} = $(this).data();
    const alerta = await  deleteConfirmAlert("¿Deseá eliminar el cliente?" , "Esta acción no podra ser deshecha")
    if(!alerta.isConfirmed) return
    try {
        loaderAlert();
        const query = await $.ajax({
            type: "DELETE",
            url: "/clientes/delete",
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
$("#formClientesContacto").submit(async function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    try {
        loaderAlert();
        const query = await $.ajax({
            type: "POST",
            url: "/clientes/newContact",
            data: data,
        });
        if (query.status) return location.reload();
    } catch (error) {
        console.log(error);
        newErrorMessage(error);
    }
});
$(".btnEliminarContacto").on("click", async function () {
    const {id} = $(this).data();
    const alerta = await  deleteConfirmAlert("¿Deseá eliminar el contacto?" , "Esta acción no podra ser deshecha")
    if(!alerta.isConfirmed) return
    try {
        loaderAlert();
        const query = await $.ajax({
            type: "DELETE",
            url: "/clientes/contactos",
            data: {id}
        });
        if(query.status) location.reload();
    } catch (error) {
        console.log(error);
        Swal.close()
        newErrorMessage(error);
    }
});