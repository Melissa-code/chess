class View {

    constructor(echiquier, document, tailleCarreau) {
        this.echiquier = echiquier;
        this.myCanva = document.querySelector("#myCanvas");
        this.tailleCarreau = tailleCarreau; 
        this.ctx = this.myCanva.getContext("2d");
        //console.log(this.ctx);  ok
        
        this.myCanva.height = this.echiquier.matrice.length * this.tailleCarreau;
        this.myCanva.width = this.echiquier.matrice[0].length * this.tailleCarreau;

        this.afficherEchiquier();
    }

    afficherEchiquier() {
        // Parcours des lignes puis colonnes
        for (let y = 0; y < this.echiquier.matrice.length; y++) {
            for (let x = 0; x < this.echiquier.matrice[0].length; x++) {        
                // Si (x + y) % 2 === 0  -> (nb pair) créer une case blanche
                this.ctx.fillStyle = (x + y) % 2 === 0 ? "#FFFFFF" : "#000000";

                this.ctx.fillRect(
                    // position de  x puis y puis taille de la case (largeur et hauteur)
                    x * this.tailleCarreau, 
                    y * this.tailleCarreau,
                    this.tailleCarreau,     
                    this.tailleCarreau      
                );
            }
        }
    }

}