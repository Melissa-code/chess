class View {

    constructor(echiquier, document, tailleCarreau) {
        this.echiquier = echiquier;
        this.myCanva = document.querySelector("#myCanvas");
        this.tailleCarreau = tailleCarreau; 
        this.ctx = this.myCanva.getContext("2d");
        
        this.myCanva.height = this.echiquier.hauteur * this.tailleCarreau;
        this.myCanva.width = this.echiquier.largeur * this.tailleCarreau;

        this.afficherEchiquier();
        this.afficherPieces(); 
    }

    afficherEchiquier() {
        // Parcours des lignes puis colonnes
        for (let y = 0; y < this.echiquier.hauteur; y++) {
            for (let x = 0; x < this.echiquier.largeur; x++) {        
                // Si (x + y) % 2 === 0  -> (nb pair) créer une case blanche
                this.ctx.fillStyle = (x + y) % 2 === 0 ? "#778da9" : "#293241";
                this.ctx.fillRect(
                    // position de x puis y puis taille de la case (largeur et hauteur)
                    x * this.tailleCarreau, 
                    y * this.tailleCarreau,
                    this.tailleCarreau,     
                    this.tailleCarreau      
                );
                // bordure de la case 
                this.ctx.lineWidth = 1;
                this.ctx.strokeStyle = "#e0e1dd"; 
                this.ctx.strokeRect(
                    x * this.tailleCarreau, 
                    y * this.tailleCarreau,
                    this.tailleCarreau,     
                    this.tailleCarreau      
                );
            }
        }
    }

    afficherPieces() {
        //console.log(this.echiquier.listePieces)
        for (let i = 0; i < this.echiquier.listePieces.length; i++) {
            const piece = this.echiquier.listePieces[i]; 
            //console.log(this.echiquier.listePieces[i])
            let x = piece.j;
            let y = piece.i; 

            this.ctx.fillStyle = piece.color === "white" ? "#FFFFFF" : "#000000"; 
            this.ctx.font = this.tailleCarreau * .8 + 'px Raleway'; 
            this.ctx.textAlign = 'center' ; // horiz
            this.ctx.textBaseline = "middle"; // vertic

            const positionX = x * this.tailleCarreau + this.tailleCarreau /2;
            const positionY = y * this.tailleCarreau + this.tailleCarreau /2; 

            this.ctx.fillText(piece.symbol, positionX, positionY);  
        }
    }

}