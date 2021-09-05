//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var categoryAuto = [];
const ORDER_ASC_BY_PRICE = "asc";
const ORDER_DESC_BY_PRICE = "desc";
const ORDER_BY_PROD_RELEVANCIA = "Relevancia";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var auxArray= [];

function verificacion() { //Toma los datos del buscador y busca coincidencias en el nombre del array de autos
    var textoEscrito = document.getElementById("buscador").value; 
    var listafiltrada = currentCategoriesArray.filter(function(name) {
        return name.name.toLowerCase().indexOf(textoEscrito.toLowerCase()) > -1; 
    })
    currentCategoriesArray=listafiltrada;
    if (textoEscrito.trim()===""){
        currentCategoriesArray= auxArray;
    } //Los que coincide lo guarda en un array
    showCategoriesList(); 
}

function sortCategories(criteria, array){ //Ordena en base a criterio requerido
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            let aC = parseInt(a.cost);
            let bC = parseInt(b.cost);

            if ( aC<bC ){ return -1; }
            if ( aC > bC ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            let aCo = parseInt(a.cost);
            let bCo = parseInt(b.cost);
            if ( aCo > bCo ){ return -1; }
            if ( aCo < bCo){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_RELEVANCIA){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList(array){
    console.log(minCount +  " "+ maxCount);
    let ListadeAutos = ""; //inicializacion de string vacío
    showSpinner();//Funcion spiner mientras hago la peticion
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

            ListadeAutos += `
            <div class="list-group-item list-group-item-action">
                <div class="row"> 
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt=" " class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name  +`</h4>
                            <p class="text-muted">` + category.cost + ` USD</p>
                    
                        </div>
                        <div class="d-flex w-100 justify-content-between">
                            <p class="text-muted" > ` + category.soldCount + ` unidades.</p>
                        </div>
                        <p> `  + category.description + `  </p>
                        
                    </div>
                </div>
            </div>
            `
            document.getElementById("car-list").innerHTML = ListadeAutos;
        }
        
    }
    hideSpinner();
}

function reordenarProductos(sortCriteria, categoriesArray){ //Almacena el arreglo y el criterio para aplicar el criterio
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);
    auxArray= currentCategoriesArray; // No se pierden los datos al mezclarlos en el buscador
    showCategoriesList();
}
//Con los document escucho los cambios de boton y los aplico
document.getElementById("rangeFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    showCategoriesList();
});
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            reordenarProductos(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });
    document.getElementById('buscador').addEventListener('keyup',()=>{

        verificacion();


    });
    document.getElementById("Pasc").addEventListener("click", function(){
        reordenarProductos(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("Pdesc").addEventListener("click", function(){
        reordenarProductos(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        reordenarProductos(ORDER_BY_PROD_RELEVANCIA);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });
});
document.getElementById("buscador").addEventListener("mouseout", verificacion); 