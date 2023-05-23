//RUTA GLOBAL
var sPath;

function docStart(ruta) {

    //Obtenemos la ruta global
    sPath = ruta;

    $("#userId").keypress(function () {
        if (document.getElementById("errorMessage")) {
            $("#errorMessage").css("display", "none");
        }
    });

    $("#password").keypress(function () {
        if (document.getElementById("errorMessage")) {
            $("#errorMessage").css("display", "none");
        }
    });

}

