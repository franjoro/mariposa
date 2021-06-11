// MATERIALES  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
$("#formMateriales").submit(async function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    try {
        loaderAlert();
        const query = await $.ajax({
            type: "POST",
            url: "/materiales/new",
            data: data,
        });
        if (query.status) return location.reload();
    } catch (error) {
        console.log(error);
        newErrorMessage(error);
    }
});
$(".btnDeleteMateriales").on("click", async function () {
    const {id} = $(this).data();
    const alerta = await  deleteConfirmAlert("¿Deseá eliminar el material?" , "Esta acción afectara a los materiales de empresas");
    if(!alerta.isConfirmed) return;
    try {
        loaderAlert();
        const query = await $.ajax({
            type: "DELETE",
            url: "/materiales/delete",
            data: {id}
        });
        if(query.status) location.reload();
    } catch (error) {
        console.log(error);
        Swal.close();
        newErrorMessage(error);
    }
});

// MATERIALES POR PROVEEDOR  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 

$("#Precio").mask("000,000,000,000,000.00", { reverse: true });

$("#formMaterialesProveedores").submit(async function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    try {
        loaderAlert();
        const query = await $.ajax({
            type: "POST",
            url: "/materiales/newMaterialProveedor",
            data: data,
        });
        if (query.status) return location.reload();
    } catch (error) {
        console.log(error);
        newErrorMessage(error);
    }
});
$(".btnDeleteMaterialesProveedores").on("click", async function () {
    const {id} = $(this).data();
    const alerta = await  deleteConfirmAlert("¿Deseá eliminar el material?" , "Esta acción no se puede deshacer");
    if(!alerta.isConfirmed) return;
    try {
        loaderAlert();
        const query = await $.ajax({
            type: "DELETE",
            url: "/materiales/deleteMaterialProveedor",
            data: {id}
        });
        if(query.status) location.reload();
    } catch (error) {
        console.log(error);
        Swal.close();
        newErrorMessage(error);
    }
});