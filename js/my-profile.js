//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var datosUser= {};
datosUser.name="";
datosUser.lastname="";
datosUser.age="";
datosUser.phone="";
datosUser.mail="";
document.addEventListener("DOMContentLoaded", function (e) {
    var auxUser= JSON.parse(localStorage.getItem("datosUserlo"));
    if (auxUser){
        datosUser=auxUser;
        console.log(datosUser);
    }
    var datos=`<input value="`+datosUser.name+`" class="form-control form-control-sm" type="text" placeholder="Name" id="name"><br>
    <input value="`+datosUser.lastname+`" class="form-control form-control-sm" type="text" placeholder="Last Name" id="lastname"><br>
    <input value="`+datosUser.age+`" class="form-control form-control-sm" type="text" placeholder="Age" id="age"><br>
    <input value="`+datosUser.phone+`" class="form-control form-control-sm" type="text" placeholder="Phone" id="phone"><br>
    <input value="`+datosUser.mail+`" class="form-control form-control-sm" type="text" placeholder="Mail" id="mail">`;
    document.getElementById("usuario").innerHTML=datos;
    document.getElementById("name").disabled=true;
    document.getElementById("lastname").disabled=true;
    document.getElementById("age").disabled=true;
    document.getElementById("phone").disabled=true;
    document.getElementById("mail").disabled=true;
    document.getElementById("edit").style.display="block";
    document.getElementById("confirm").style.display="none";
    document.getElementById("cancel").style.display="none";
});

function editable(){
    document.getElementById("name").disabled=false;
    document.getElementById("lastname").disabled=false;
    document.getElementById("age").disabled=false;
    document.getElementById("phone").disabled=false;
    document.getElementById("mail").disabled=false;
    document.getElementById("edit").style.display="none";
    document.getElementById("confirm").style.display="block";
    document.getElementById("cancel").style.display="block";
}

function confirmarDatos(){
    datosUser.name=document.getElementById("name").value;
    datosUser.lastname=document.getElementById("lastname").value;
    datosUser.age=document.getElementById("age").value;
    datosUser.phone=document.getElementById("phone").value;
    datosUser.mail=document.getElementById("mail").value;
    console.log(datosUser);
    localStorage.setItem("datosUserlo",JSON.stringify(datosUser));
    location.href="my-profile.html";
}

function cancelDatos(){
    location.href="my-profile.html";
}

