//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
/*document.addEventListener("DOMContentLoaded", function(e){

});

*/
function validarDatos(){
    let email= document.getElementById("email");
    let contrasenia= document.getElementById("contrasenia");
    let datosUsuario={};
    if ((email.value==="")||(contrasenia.value==="")){
        alert("Error! Complete los datos porfavor.")
    }else{
        datosUsuario.email= email.value;
        localStorage.setItem("emailUs",JSON.stringify(datosUsuario));
        location.href="principal.html";
    }
}
