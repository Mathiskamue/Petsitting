window.addEventListener("load", function() {
    let hmodal = document.getElementById("hmodal");
    let hinzu = document.getElementById("hinzu");
    let close = document.getElementsByClassName("close")[0];


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
