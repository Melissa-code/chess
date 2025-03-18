class View {

    constructor(echiquier, document, tailleCarreau) {
        this.echiquier = echiquier;
        this.myCanva = document.querySelector("#myCanvas");
        this.tailleCarreau = tailleCarreau; 
        this.ctx = this.myCanva.getContext("2d");
        this.myCanva.height = this.echiquier.hauteur * this.tailleCarreau;
        this.myCanva.width = this.echiquier.largeur * this.tailleCarreau;
        this.refresh();
        this.myCanva.addEventListener("click", (e) => this.clickOnCanva(e));
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
            this.ctx.font = this.tailleCarreau * .7 + 'px Raleway'; 
            this.ctx.textAlign = 'center' ; // horiz
            this.ctx.textBaseline = "middle"; // vertic

            const positionX = x * this.tailleCarreau + this.tailleCarreau /2;
            const positionY = y * this.tailleCarreau + this.tailleCarreau /2; 

            this.ctx.fillText(piece.symbol, positionX, positionY);  

            // Update piece
            if (piece.isMoved) {
                // Efface ctx du canvas
                this.ctx.clearRect(
                    piece.oldPosition.j * this.tailleCarreau, 
                    piece.oldPosition.i * this.tailleCarreau, 
                    this.tailleCarreau, 
                    this.tailleCarreau
                );
                // Redessine la case 
                this.ctx.fillStyle = (piece.oldPosition.j + piece.oldPosition.i) % 2 === 0 ? "#778da9" : "#293241";
                this.ctx.fillRect(
                    piece.oldPosition.j * this.tailleCarreau, 
                    piece.oldPosition.i * this.tailleCarreau, 
                    this.tailleCarreau, 
                    this.tailleCarreau
                );

                piece.isMoved = false; 
            }

        }
    }

    refresh() {
        this.afficherEchiquier();
        this.afficherPieces();
        let piece = this.echiquier.pieceSelectionnee;
        
        if (piece) {
            this.highLightBox(piece.i, piece.j);
        }

        this.displayRemainedPieces() 
        this.displayTurnOfPlayer();
        this.displayCheck();
    }

    highLightBox(i,j) {
        let y = i; 
        let x = j;       
        this.ctx.lineWidth = 4;

        this.ctx.strokeRect(
            x * this.tailleCarreau, 
            y * this.tailleCarreau,
            this.tailleCarreau,     
            this.tailleCarreau      
        );
    }

    clickOnCanva(e) {
        // Position exacte: renvoie la taille d'un élément et sa position par rapport à la fenêtre d'affichage 
        const rect = this.myCanva.getBoundingClientRect();
        // get X et Y dans le canvas
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
    
        // convertir les pixels en coordonnées 
        const i = Math.floor(y / this.tailleCarreau); 
        const j = Math.floor(x / this.tailleCarreau);  
        //console.log(`case cliquée ${i}, ${j}`);
        this.echiquier.gestionClic(i, j);

        this.refresh(); 
    }

    displayRemainedPieces() {
        const remainedPiecesCountWhite = this.echiquier.remainedPieces("white");
        const remainedPiecesCountBlack = this.echiquier.remainedPieces("black");
        const remainedPieces = document.querySelector(".remained-pieces"); 
        remainedPieces.textContent = `Pièces restantes des Blancs: ${remainedPiecesCountWhite} et des Noirs: ${remainedPiecesCountBlack}`;
    }

    createChessImage(player, imgSrc) {
        const container = document.createElement("span");
        container.style.backgroundColor = this.echiquier.tourDuJoueur === "white" ? "#415a77" : "#778da9";
        container.style.width = "1.5rem";
        container.style.height = "1.5rem";
        container.style.border = "1px solid #e0e1dd";
        container.style.borderRadius = "10%";
        container.style.padding = ".5rem .5rem .1rem .5rem";
        container.style.marginLeft = ".6rem"; 

        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = `Tour des ${player}`;
        img.style.width = "1.3rem";  
        img.style.height = "1.3rem";  
        container.appendChild(img);
    
        return container;
    }
    
    displayTurnOfPlayer() {
        const turnPlayerMessage = document.querySelector(".message-player"); 
        const imgSrc = this.echiquier.tourDuJoueur === "white" ? "images/chess_white1.svg" : "images/chess1.svg";
        const player = this.echiquier.tourDuJoueur === "white" ?  "Blancs" :  "Noirs";
        const imgContainer = this.createChessImage(player, imgSrc); 
    
        turnPlayerMessage.textContent = `C'est au tour des ${player} de jouer `;
        turnPlayerMessage.appendChild(imgContainer);  
    }

    displayCheck() {
        const check = document.querySelector('.check'); 
    
        if (this.echiquier.gameOver === true) {
            check.textContent = `Echec et mat !`;
        } else if (this.echiquier.inCheck === true) {
            check.textContent = `Echec !`;
        } else {
            check.textContent = "";
        }
    }
}

export default View; 