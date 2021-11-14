//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productos_almacenados = [];
let tarjetaCredito=true;
let tarjetaBanco=true;
let total=0;
let aux;
let Penvío=0;
let costoEnvio=0;
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_CART).then(function(resultObj){//pedir comentarios
        if (resultObj.status === "ok"){
            productos_almacenados= resultObj.data;
            mostrarCarrito();
        }
    });
   document.getElementById("eleccionEnvios").addEventListener("click",function(){
       let exp= document.getElementById("envioB").checked;
       let prem= document.getElementById("envioA").checked;
       let stand= document.getElementById("envioC").checked;
       if (exp){
            costoEnvio= parseFloat((total * 0.07).toFixed(2));
       }
       if (prem){
            costoEnvio= total * 0.15;
        }
        if (stand){
            costoEnvio= total * 0.05;
       }
       document.getElementById("envio").innerHTML= "USD" + " " + costoEnvio;
       document.getElementById("tot").innerHTML = "USD"+parseFloat(total+costoEnvio);

   })
});

function mostrarCarrito(){
    total=0;
    let contenido= `<table class="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">IMG</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio c/u</th>
                            <th scope="col">Subtotal</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>`
                    for(let i=0;i<productos_almacenados.articles.length;i++){
                    
                        contenido+=`
                    <tr>
                        <th scope="row"><img src="`  + productos_almacenados.articles[i].src + `" alt="..." class="img-thumbnail"></th>
                        <td>`  + productos_almacenados.articles[i].name + `</td>
                        <td><input  type="number" id="cantidad`+i+`" onchange="valor(`+i+`);" name="cantidadA" min="0" value="`  + productos_almacenados.articles[i].count + `"></td>`
                        if (productos_almacenados.articles[i].currency==="UYU"){
                            productos_almacenados.articles[i].unitCost/=40;
                            productos_almacenados.articles[i].currency="USD";
                        }
                        contenido+= `<td> USD `  + productos_almacenados.articles[i].unitCost + `</td>
    
                        <td id="pre`+i+`"> USD`  + productos_almacenados.articles[i].count*productos_almacenados.articles[i].unitCost + `</td>
                        <td>
                            <button onclick="eliminar(`+i+`);" type="button" class="btn btn-danger">Eliminar</button>
                        </td>
                    
                    </tr>`;
                    total+= parseFloat(productos_almacenados.articles[i].count)* parseFloat(productos_almacenados.articles[i].unitCost);
                    }  
                    costoEnvio= total*0.15;
                    contenido+=`
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Precio envío:</td>
                        <td id="envio">USD` +parseFloat(costoEnvio)+ `</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Total:</td>
                        <td id="tot">USD` +parseFloat(total+costoEnvio)+ `</td>
                    </tr>`;
                        
    contenido +=`</tbody></table>`;
    document.getElementById("cart-list").innerHTML = contenido;
    document.getElementById("Tcredito").style.display= "none";
    document.getElementById("tBank").style.display= "none";
    
}

function valor(letra){
    let identificador= "cantidad" + letra;
    let precio= "pre" + letra;
    document.getElementById(precio).innerHTML = "USD"+"  " + parseFloat(document.getElementById(identificador).value*productos_almacenados.articles[letra].unitCost);
    productos_almacenados.articles[letra].count= document.getElementById(identificador).value;
    total=0;
    for(let j=0;j<productos_almacenados.articles.length;j++){
        total+= productos_almacenados.articles[j].count*productos_almacenados.articles[j].unitCost;
    }
    document.getElementById("tot").innerHTML = "USD"+parseFloat(total+costoEnvio);
    
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');
    
    // Loop over them and prevent submission
    
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
        
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            aux=false;
        }else {
            event.preventDefault();
            aux=true;
        }
          form.classList.add('was-validated')
        }, false)
      })
  })()

function verificarFinal(){
    let datos1=document.getElementById("csv").value.trim();
    let datos2=document.getElementById("nroCta").value.trim();
    let datos3=document.getElementById("vto").value.trim();
    let datos4=document.getElementById("nroTarjeta").value.trim();
    if (tarjetaBanco){
        if(datos2===""){
            aux=false;
        }else {
            aux=true;
        }
    }
    if (tarjetaCredito){
        if((datos1==="")||(datos4==="")||(datos3==="")){
            aux=false;
        }else {
            aux=true;
        }
    } 
    if (aux){
        swal("Pedido exitoso!", "Su pedido se ha registrado exitosamente. Su pedido llegará en el plazo estimado", "success")
    }else{
        swal("Cuidado!", "Hay campos por completar", "warning")
    }
}

function mostrarDatosTcredito(){
    document.getElementById("Tcredito").style.display= "block";
    document.getElementById("tBank").style.display= "none";
    tarjetaBanco= false;
    tarjetaCredito= true;

    
}

function mostrarDatosTBank(){
    document.getElementById("Tcredito").style.display= "none";
    document.getElementById("tBank").style.display= "block";
    tarjetaBanco= true;
    tarjetaCredito= false;
}
function eliminar(x){
    productos_almacenados.articles.splice(x,1);
    mostrarCarrito();
}