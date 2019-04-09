/**
 * Création de la carte avec l'objet Map
 *
 * @initmap = Création de la carte placée dans l'id "map" avec une position définie.
 * @markerCluster = Tableau avec les marqueurs qui les rassembleront.
 * @initMarqueur = Intégration des marqueurs sur la carte lié au markercluster.
 * @groupMarqueur = La méthode pour regrouper les marqueurs dans markerclusterer.
 */

var Maps = {

    initMap : function() {
        map = new google.maps.Map(document.getElementById('map'), {
            center : {lat: 43.604069, lng: 1.443473},
            zoom : 13
        });
    },

    markerCluster : [],

    initMarqueur : function(positionStation) {
        marker = new google.maps.Marker({
            map : map,
            icon : "../images/grouper2.png",
            position : positionStation
        });
        this.markerCluster.push(marker);
    },

    groupMarqueur : function() {
        marqueurCluster = new MarkerClusterer(map, this.markerCluster,
            {
                imagePath_ : "../images/m1.png",
            });
    }
};

/**
 * Traduction des données de l'API avec l'objet Stations
 *
 * @Stations = On définit les expressions pour l'api JCDecaux
 * @dataStation = Attribution des expressions avec la documentation JCDecaux.
 * @insertDataStation = Intégration des données sur l'HTML avec les id.
 */

var Stations = {
    nom : "",
    nbVelo : "",
    nbAttache : "",
    data : document.getElementById("infoListe"),

    dataStation : function(dataStation) {
        this.nom = dataStation.name;
        this.nbVelo = dataStation.available_bikes;
        this.nbAttache = dataStation.available_bike_stands;
    },

    insertDataStation : function() {
        document.getElementById("nomStat").innerHTML = this.nom;
        document.getElementById("veloStat").innerHTML = this.nbVelo;
        document.getElementById("padispoStat").innerHTML = this.nbAttache;
    },

    confirm : document.getElementById("confirm"),
    nomUsers: document.getElementById("name").value,
    prenomUsers: document.getElementById("pren").value,
    cancel : document.getElementById("annuler"),
    confirmRes : document.getElementById("resConf"),

    transCanvas : function() {
        document.getElementById("reserv").style.display = "none";
        document.getElementById("canvasRes").style.display = "block";
    },
    cancelCanvas : function() {
        document.getElementById("reserv").style.display = "block";
        document.getElementById("canvasRes").style.display = "none";
    },
    reloadCanvas : function() {
        document.getElementById("boiteReserv").style.display = "block";
        document.getElementById("canvasRes").style.display = "none";
    }
};

// Appel de l'api JCDecaux.

ajaxGet(' https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=0d4377245b5e6feeb851d1d2990db003435f58d6', function(reponse) {
   listeStations = JSON.parse(reponse);

   listeStations.forEach(function(repStationStatus) {

       Maps.initMarqueur(repStationStatus.position);

       google.maps.event.addListener(marker, "click", function(){

           document.getElementById("reserv").style.display = "block";

           document.getElementById("canvasRes").style.display = "none";

           Stations.dataStation(repStationStatus);

           Stations.insertDataStation();

           sessionStorage.clear();


       });
       Stations.confirm.addEventListener("click", function(){

           Stations.transCanvas();

       });
       Stations.cancel.addEventListener("click", function(){

           Stations.cancelCanvas();

       });
       Stations.confirmRes.addEventListener("click", function (){

           Stations.reloadCanvas();

           document.getElementById("boiteReserv").style.display = "block"

       })

   });
    Maps.groupMarqueur()
});


