//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var categoryAuto = [];

function showCategoriesList(array){
    let ListadeAutos = ""; //inicializacion de string vacío
    showSpinner();//Funcion spiner mientras hago la peticion
    for(let i = 0; i < array.length; i++){
        let category = array[i];//For para peticion de cada espacio de array

        ListadeAutos += `
        <div class="list-group-item list-group-item-action">
            <div class="row"> 
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt=" " class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name +`</h4>
                        <p class="text-muted">` + category.cost + ` USD</p>
                    </div>
                    <p> `  + category.description + `  </p>
                    
                </div>
            </div>
        </div>
        `

        document.getElementById("car-list").innerHTML = ListadeAutos;
    }
    hideSpinner();
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(autosObj){ //Peticion a fetch con products_url
        if (autosObj.status === "ok") 
        {
            categoryAuto = autosObj.data;
            showCategoriesList(categoryAuto);//Realiza función si la peticion es exitosa
        }
    });
});