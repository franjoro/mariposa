const loader = () => {
    Swal.fire({
     title: "Por favor, Espere",
     html: "Cargando Data",
     allowOutsideClick: !1,
     showConfirmButton: false,
     willOpen: () => {
       Swal.showLoading();
     },
   });
 };
 const errorMessage = () => {
   Swal.fire({
     icon: "error",
     title: "Oops...",
     text: "Por favor verifica la información",
   });
 };
 $("#loginForm").submit(async function (e) {
   e.preventDefault();
   const t = $(this).serialize();
   loader();
   try {
     const data = await $.ajax({ url: "/signin", type: "POST", data: t });
     if(data.status){
         // CAMBIAR RUTAS
         if(data.role  === 0) window.location.replace('/admin/cursos');
         if(data.role  === 1) window.location.replace('/admin/');
         swal.close();
     }
   } catch (error) {
     swal.close();
     console.log(error);
     errorMessage();
   }
 });