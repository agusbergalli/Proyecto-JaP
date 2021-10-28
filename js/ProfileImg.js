
document.addEventListener("DOMContentLoaded", () => {
    const recentImageDataURl = localStorage.getItem("profileImg");
    if (recentImageDataURl) {
        document.querySelector("#profile").setAttribute("src", recentImageDataURl);

    }
});

function guardarImg(datoImg){
    
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            console.log(reader.result);
            localStorage.setItem("profileImg", reader.result);
        });
        reader.readAsDataURL(datoImg.files[0]);
        location.href="my-profile.html";
    
    
}