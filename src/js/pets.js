window.addEventListener("load", function() {
    let close = document.getElementById("close");
    let hmodal = document.getElementById("hmodal");
    let hinzu = document.getElementById("hinzu");


    hinzu.addEventListener("click", function () {
        hmodal.style.display = "block";
    });


    close.addEventListener("click", function () {
        hmodal.style.display = "none";
    });

    window.addEventListener("click", function() {
        if (event.target == hmodal) {
            hmodal.style.display = "none";
        }
    });


});
