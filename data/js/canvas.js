/**
 * Création de la carte avec l'objet Canvas
 *
 * canvas = Sélection du Canvas dans l'HTML.
 * contexte = Contexte du Canvas.
 * dessin  = Défini si on veut dessiner dans le canvas {false = désactiver}.
 * picSignature = Image de la signature (qu'on réutiliseras dans le localStorage).
 * -------------------
 * @contexteCanv = Permet le dessin sur le canvas.
 * @activDessin = Active le tracage quand la souris est sur le canvas.
 * @desacDessin = Désactive le tracage.
 * @posSouris = Détermine la position de la souris dans le canvas.
 * @xySouris = Récupère la position x, y de la souris.
 * @clearCanvas = Efface le canvas.
 */

var Canvas = {

    canvas : document.getElementById("signature"),
    contexte : "",

    contexteCanv : function(x, y) {
        this.contexte = this.canvas.getContext('2d');

        if(this.dessin){
            this.contexte.lineTo(x, y);
            this.contexte.stroke();
        }
    },

    dessin : "",

    activDessin : function() {
        this.dessin = true;
        this.contexte.beginPath();
        this.contexte.moveTo(positionX, positionY);
    },

    desacDessin : function() {
        this.dessin = false
    },

    posSouris : function() {
        rectangle = this.canvas.getBoundingClientRect();
        return{
            x:event.clientX - rectangle.left,
            y:event.clientY - rectangle.top
        };
    },

    xySouris : function() {
        sourisPosition = this.posSouris();
        positionX = sourisPosition.x;
        positionY = sourisPosition.y;
        this.contexteCanv(positionX, positionY);
    },

    clearCanvas : function() {
        this.contexte.clearRect(0, 0, 250, 150);
    },

    canvasImage : "",
};

// Appel

Canvas.canvas.addEventListener("mousedown", Canvas.activDessin.bind(Canvas));
Canvas.canvas.addEventListener("mousemove", Canvas.xySouris.bind(Canvas));
Canvas.canvas.addEventListener("mouseup", Canvas.desacDessin.bind(Canvas));

    document.getElementById("effacer").addEventListener("click", function() {
        Canvas.clearCanvas();
    });
    document.getElementById("resConf", function () {
        Canvas.clearCanvas();
    });
