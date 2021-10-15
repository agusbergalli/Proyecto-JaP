//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productos_almacenados = [];
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_CART).then(function(resultObj){//pedir comentarios
        if (resultObj.status === "ok"){
            productos_almacenados= resultObj.data;
            mostrarCarrito();
        }
    });
   
});

function mostrarCarrito(){
    let contenido= ` <table class="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">IMG</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio c/u</th>
                            <th scope="col">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row"><img src="`  + productos_almacenados.articles[0].src + `" alt="..." class="img-thumbnail"></th>
                        <td>`  + productos_almacenados.articles[0].name + `</td>
                        <td><input  type="number" id="cantidad0" onchange="valor(0);" name="cantidadA" min="0" value="`  + productos_almacenados.articles[0].count + `"></td>`
                        if (productos_almacenados.articles[0].currency==="UYU"){
                            productos_almacenados.articles[0].unitCost/=40;
                        }
                        contenido+= `<td> USD `  + productos_almacenados.articles[0].unitCost + `</td>
    
                        <td id="pre0"> USD`  + productos_almacenados.articles[0].count*productos_almacenados.articles[0].unitCost + `</td>
                    </tr>
                    <tr>
                        <th scope="row"><img src="`  + productos_almacenados.articles[1].src + `" alt="..." class="img-thumbnail"></th>
                        <td>`  + productos_almacenados.articles[1].name + `</td>
                        <td><input  type="number" id="cantidad1" onchange="valor(1);" name="cantidadB" min="0" value="`  + productos_almacenados.articles[1].count + `"></td>`
                        if (productos_almacenados.articles[1].currency==="UYU"){
                            productos_almacenados.articles[1].unitCost/=40;
                        }
                        contenido+= `<td> USD `  + productos_almacenados.articles[1].unitCost + `</td>
    
                        <td id="pre1"> USD`  + productos_almacenados.articles[1].count*productos_almacenados.articles[1].unitCost + `</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Total:</td>
                        <td id="tot">USD`  + parseFloat((productos_almacenados.articles[0].count*productos_almacenados.articles[0].unitCost) +(productos_almacenados.articles[1].count*productos_almacenados.articles[1].unitCost)) + `</td>
                    </tr>`;
                        
    contenido +=`</tbody></table>`;
    document.getElementById("cart-list").innerHTML = contenido;
}

function valor(letra){
    let identificador= "cantidad" + letra;
    let precio= "pre" + letra;
    document.getElementById(precio).innerHTML = "USD"+"  " + parseFloat(document.getElementById(identificador).value*productos_almacenados.articles[letra].unitCost);
    productos_almacenados.articles[letra].count= document.getElementById(identificador).value;

    document.getElementById("tot").innerHTML = "USD"+"  " + parseFloat((productos_almacenados.articles[0].count*productos_almacenados.articles[0].unitCost) +(productos_almacenados.articles[1].count*productos_almacenados.articles[1].unitCost));
}