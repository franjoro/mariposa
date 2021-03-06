const newErrorMessage = (data = "") => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se pudo realizar la operación" + data,
    });
  };
  
  const loaderAlert = () => {
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

  const deleteConfirmAlert =  (title, text)=>{
   return Swal.fire({
      title , text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
    });
  } ;

  const ConfirmAlert =  (title, text)=>{
    return Swal.fire({
       title , text,
       icon: "info",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Si, aceptar",
     });
   } ;