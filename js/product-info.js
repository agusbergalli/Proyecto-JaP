//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var comentarios= [];
var arrayinfoautos=[];
var relacionados=[];
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){//pedir comentarios
        if (resultObj.status === "ok"){
            comentarios= resultObj.data;
        }
    });
    getJSONData(PRODUCTS_URL).then(function(resultObj){//pedir comentarios
        if (resultObj.status === "ok"){
            relacionados= resultObj.data;
        }
    });
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){//Pido info auto
        if (resultObj.status === "ok"){
            arrayinfoautos= resultObj.data;
            allcomments = JSON.parse(localStorage.getItem("Comentar"));//Agregar comentarios del usuario
            if(allcomments === null){
                allcomments = [];
            }
            for(let q=0;q<allcomments.length;q++){
                comentarios.push(allcomments[q]);
            }
            cargardatos();
        }
    });

});

function cargardatos (){
    var contenido="";
    //Construccion de HTML en JS
       //info báscia del auto
    contenido=  ` <h2> ` + arrayinfoautos.name +  ` </h2>
                    <div id="desc" class="row">
                    <div  class="col-12 col-md-8">` + arrayinfoautos.description +`</div>
                    <br><div id="precio" class="col-6 col-md-4"> `+ arrayinfoautos.currency + arrayinfoautos.cost +  `<br><br> Cantidad Vendidos: ` + arrayinfoautos.soldCount +  `</div>
                    </div><hr><h4> Imagenes</h4>
                    <div></div>`
                    contenido+= `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>`;
                    for (let e=1; e<arrayinfoautos.images.length; e++){
                        contenido+= `<li data-target="#carouselExampleIndicators" data-slide-to="`+ e +`"></li>`;
                    }
                    contenido += `</ol>
                                <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="`+ arrayinfoautos.images[0]+`" class="d-block w-100" >
                                </div> `
                    for (let t=1; t<arrayinfoautos.images.length; t++){
                        contenido+= `<div class="carousel-item">
                                            <img src="`+ arrayinfoautos.images[t]+`" class="d-block w-100" >
                                    </div>`;
                    }
                    contenido += `
                                </div>
                                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                    </a>
                                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                    </a>
                                </div>`
    //Info de los comentarios
    contenido += `<hr><h4> Comentarios </h4> ` 
    for (let j=0; j<comentarios.length;j++){
        contenido += `<div class="caja list-group-item list-group-item-info" role="alert">
                    <span>`+comentarios[j].user+`</span>
                    <span>`+comentarios[j].dateTime+`</span>` 
                    let estrellas=5;
                    for (let m=0; m < comentarios[j].score; m++ ){//estrellas prendidas
                        contenido +=` <span id="heart" class="fa fa-heart checked"> </span>`;
                        estrellas--;
                      }
              
                      for (let k=0; k < estrellas; k++ ){//estrellas no prendidas
                        contenido +=` <span class="fa fa-heart"></span>`;
                       
                      }
              
                    contenido += `<br>
                    <p>`+comentarios[j].description+`</p>

                    </div><br>`

    //console.log(comentarios[j].user)
    }
    //Se crea caja de comentarios
    contenido += `<hr><h4> Nuevo Comentario </h4> 
                <div class="container"> 
                    <input id="nameid" class="form-control" type="text" placeholder="Ingrese su Nombre"><br>
                    <div class="rate">
                        <input type="radio" id="star5" name="rate" value="5" />
                        <label for="star5" title="text">5 stars</label>
                        <input type="radio" id="star4" name="rate" value="4" />
                        <label for="star4" title="text">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3" />
                        <label for="star3" title="text">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label for="star2" title="text">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label for="star1" title="text">1 star</label>
                    </div>

                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea><br>
                    <button onclick="verificarComentar();" type="button" class="btn btn-info">Comentar</button>  
                </div>` 
    
    contenido += `<hr><h4> Productos Relacionados </h4> `

    for(let x=0; x<arrayinfoautos.relatedProducts.length; x++){
      let posicion= arrayinfoautos.relatedProducts[x];
      contenido += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row"> 
                    <div class="col-3">
                        <img src="` + relacionados[posicion].imgSrc + `" alt=" " class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ relacionados[posicion].name  +`</h4>
                            <p class="text-muted">` + relacionados[posicion].cost + ` USD</p>
                    
                        </div>
                        <div class="d-flex w-100 justify-content-between">
                            <p class="text-muted" > ` + relacionados[posicion].soldCount + ` unidades.</p>
                        </div>
                        <p> `  + relacionados[posicion].description + `  </p>
                        
                    </div>
                </div>
            </a>
            `
    }

    document.getElementById("infoAutos").innerHTML = contenido;
}

let allcomments=[];
let specificComent={};

//Verificar comentarios
function verificarComentar (){
    let mensaje = document.getElementById("exampleFormControlTextarea1").value;
    let name = document.getElementById("nameid").value;
    if(mensaje.trim()==="" && name.trim()===""){
        alert("Campos vacío. Por favor ingrese Nombre y Comentario.")
    }else{//Agrega comentario al conjunto de comentarios del usuario
        let estrella1= document.getElementById("star1").checked;
        let estrella2= document.getElementById("star2").checked;
        let estrella3= document.getElementById("star3").checked;
        let estrella4= document.getElementById("star4").checked;
        let estrella5= document.getElementById("star5").checked;
        let numero=0;
        if(estrella1){
            numero=1;
        }
        if(estrella2){
            numero=2;
        }
        if(estrella3){
            numero=3;
        }
        if(estrella4){
            numero=4;
        }
        if(estrella5){
            numero=5;
        }
        var pidoFecha = new Date();
        var m = pidoFecha.getMonth() + 1;
        var d = pidoFecha.getDate();

        if(d < 10){
        d= "0" + d;
        }

        if (m < 10){
        m= "0" + m;
        }
        var fecha = pidoFecha.getFullYear() + '-' + m + '-' + d;
        var h = pidoFecha.getHours() + ':' + pidoFecha.getMinutes() + ':' + pidoFecha.getSeconds();
        var fechaHora = fecha + '  ' + h;
        

        specificComent.dateTime = fechaHora;
        specificComent.description =  mensaje;
        specificComent.score = numero;
        specificComent.user = name;

        allcomments.push(specificComent);

        localStorage.setItem("Comentar", JSON.stringify(allcomments));
        location.href ="product-info.html";
         } 
        

}