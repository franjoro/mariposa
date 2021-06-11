$("#formCotizaciones").submit(async function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    try {
        loaderAlert();
        const query = await $.ajax({
            type: "POST",
            url: "/cotizaciones/newCotizacion",
            data: data,
        });
        if (query.status) return location.reload();
    } catch (error) {
        console.log(error);
        newErrorMessage(error);
    }
});

$(".btnDeleteCotizaciones").on("click", async function () {
    const {id} = $(this).data();
    const alerta = await  deleteConfirmAlert("¿Deseá eliminar la cotización?" , "Se eliminara toda la información contenida en esta cotización");
    if(!alerta.isConfirmed) return;
    try {
        loaderAlert();
        const query = await $.ajax({
            type: "DELETE",
            url: "/cotizaciones/delete",
            data: {id}
        });
        if(query.status) location.reload();
    } catch (error) {
        console.log(error);
        Swal.close();
        newErrorMessage(error);
    }
});