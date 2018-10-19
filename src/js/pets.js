window.addEventListener("load", function() {
    var btnhinzu = document.getElementById('btnhinzu');
    var modaljs = document.getElementById('modaljs');
    var btnzu = document.getElementById('btnzu');

    btnhinzu.onclick = function() {
        modaljs.style.display = "block";

    }
    btnzu.onclick = function() {
        modaljs.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modaljs) {
            modaljs.style.display = "none";
        }
    }






});
