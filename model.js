/* ************************************************************** */
/*        Pièces du jeu                                           */
/* ************************************************************** */

class Piece {

    constructor(color, i, j) {
        this.color = color;
        this.i = i;
        this.j = j;
        this.isMoved = false;
        this.oldPosition = { 
            i: i, 
            j: j 
        };
    }

    canMove(echiquier, i, j) {
        if (i < 0 || i > 7 || j < 0 || j > 7) {
            console.log('Pièce hors de l’échiquier');
            return false;
        } else {
            return true; 
        }
    }
}

/* ********* PION ********** */

class Pion extends Piece {

    constructor(color, i, j) {
        super(color, i, j);
        this.symbol = color === "white" ? "\u2659" : "\u265F";
    }

    /**
     * règles de déplacement du pion 
     * @returns {boolean} 
     */
    canMove(echiquier, i, j) {
        if (!super.canMove(echiquier, i, j)) {
            return false; 
        }

        // capture adversaire
        const pieceACapturer = echiquier.getPosition(i, j);
        if (pieceACapturer) {
            if (pieceACapturer.color !== this.color) {
                // supprime adversaire (nb 1)
                const index = echiquier.listePieces.indexOf(pieceACapturer); 
                if (index >= 0) { 
                    echiquier.listePieces.splice(index, 1); 
                }
                console.log("Pièce adverse capturée par le pion")
                return true; 
            } else {
                return false;
            }
        }
       
        if (echiquier.isOccupied(i, j)) {
            return false;
        }

        // Pion blanc 
        if (this.color === "white") {
            // Avance de 2 cases
            if (this.i === 1 && i === 3 && this.j === j) {
                console.log("Pion blanc avance de 2 cases")
                return true; 
            }
            // Avance de 1 case
            if (i === this.i + 1 && this.j === j) { 
                console.log("Pion blanc avance de 1 case")
                return true; 
            }
            return false;
        
        // Pion noir
        } else {
            // Avance de 2 cases
            if (this.i === 6 && i === 4 && this.j === j) {
                console.log("Pion noir avance de 2 cases")
                return true; 
            }
            // Avance de 1 case
            if (i === this.i - 1 && this.j === j) { 
                console.log("Pion noir avance de 1 case")
                return true; 
            }
            return false;
        }
    }
}

/* ********* TOUR ********** */

class Tour extends Piece {

    constructor(color, i, j) {
        super(color, i, j);
        this.symbol = color === "white" ? "\u2656" : "\u265C";
    }
}

/* ********* CAVALIER ********** */

class Cavalier extends Piece {

    constructor(color, i, j) {
        super(color, i, j);
        this.symbol = color === "white" ? "\u2658" : "\u265E";
    }
}

/* ********* FOU ********** */

class Fou extends Piece {

    constructor(color, i, j) {
        super(color, i, j);
        this.symbol = color === "white" ? "\u2657" : "\u265D";
    }
}

/* ********* REINE ********** */

class Reine extends Piece {

    constructor(color, i, j) {
        super(color, i, j);
        this.symbol = color === "white" ? "\u2655" : "\u265B";
    }
}

/* ********* ROI ********** */

class Roi extends Piece {

    constructor(color, i, j) {
        super(color, i, j);
        this.symbol = color === "white" ? "♔" : "♚";
    }
}

/* ************************************************************** */
/*        Fabrique Pièce (factory)                                */
/* ************************************************************** */

class PieceFactory {

    static createPiece(type, color, i, j) {
        switch(type) {
            case "pion": 
                return new Pion(color, i, j);
            case "tour": 
                return new Tour(color, i, j); 
            case "cavalier": 
                return new Cavalier(color, i, j); 
            case "fou":   
                return new Fou(color, i, j); 
            case "reine":   
                return new Reine(color, i, j); 
            case "roi": 
                return new Roi(color, i, j);  
            default: 
                console.log("Aucune pièce fabriquée"); 
                return null; 
        }  
    }
}


/* ************************************************************** */
/*        Echiquier                                               */
/* ************************************************************** */

class Echiquier {

    constructor() {
        this.hauteur = 8; 
        this.largeur = 8; 
        this.listePieces = []; 
        this.initGame(); 
    }

    getTypeOfPiece(col) {
        switch(col) {
            case 0: case 7:
                return "tour"; 
            case 1: case 6:
                return "cavalier"; 
            case 2: case 5: 
                return "fou"; 
            case 3:
                return "reine"; 
            case 4:
                return "roi"; 
            default: 
                console.log("Aucune pièce dans cette colonne"); 
                return null; 
        }
    }

    initGame() {
        for (let i = 0; i < this.hauteur; i++) {
            for(let j = 0; j < this.largeur; j++) {
                // 1re ligne (des blancs)
                if (i === 0) {
                    this.listePieces.push(PieceFactory.createPiece(this.getTypeOfPiece(j), "white", i , j));
                } else if (i === 1) {
                    this.listePieces.push(PieceFactory.createPiece("pion", "white", i, j)); 
                } else if (i === 6) {
                    this.listePieces.push(PieceFactory.createPiece("pion", "black", i, j)); 
                } else if (i === 7) {
                    this.listePieces.push(PieceFactory.createPiece(this.getTypeOfPiece(j), "black", i, j));
                }
            }
        }
    }

    getPosition(i, j) {
        for(let k = 0; k < this.listePieces.length; k++ ) {
            if(this.listePieces[k].i === i && this.listePieces[k].j === j) {
                console.log(`Position actuelle de la piece : ${i} ${j}`);
                return this.listePieces[k];
            }
        }

        return null;
    }

    isOccupied(i, j) {
        for (const piece of this.listePieces) {
            if (piece.i === i && piece.j === j) {
                console.log("Case occupée");
                return true;
            }
        }
        return false; 
    }
  
    deplacerPiece(piece, i, j) {
        if (piece.canMove(this, i, j)) {
            piece.oldPosition = { 
                i: piece.i, 
                j: piece.j 
            };
            piece.i = i; 
            piece.j = j;
            piece.isMoved = true;
            console.log(`Nouvelle position de la pièce: ${i} ${j}`); 
            return true;
        } else {
            console.log("Déplacement impossible"); 
            return false;
        }
    }
}