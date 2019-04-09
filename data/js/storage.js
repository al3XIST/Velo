var Storage = {
    stationName: "",
    nomUsers2 : "",
    prenomUsers2 : "",
    nomStation: "",


    nameReserv : function (){
        sessionStorage.setItem("Nom", Stations.nomUsers);
        sessionStorage.setItem("Prenom", Stations.prenomUsers);
    },

    lancementReservation: function () {

        sessionStorage.setItem("stationName", Stations.nom);

    },

    resetReserv: function() {
        sessionStorage.clear();
        document.getElementById("boiteReserv").style.display = "none";
    },

    confirmRes : function () {
        if(sessionStorage.getItem("stationName")){

            this.nomStation = sessionStorage.getItem("stationName");
            this.nomUsers2 = sessionStorage.getItem("Nom");
            this.prenomUsers2 = sessionStorage.getItem("Prenom");


            document.getElementById("resStat").innerHTML = this.nomStation;
            document.getElementById("resNom").innerHTML = this.nomUsers2;
            document.getElementById("resPre").innerHTML = this.prenomUsers2;

        }
    },

};

document.getElementById("confirm").addEventListener("click", function () {
    Storage.nameReserv();
    console.log("yes");
});


document.getElementById("annuleRes").addEventListener("click", function() {
    Storage.resetReserv()
});


document.getElementById("resConf").addEventListener("click", function() {
    sessionStorage.setItem("signature", Canvas.canvas.toDataURL());
    Canvas.clearCanvas();
    Storage.lancementReservation();
    Storage.confirmRes();
});


