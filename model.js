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
            //console.log('Pièce hors de l’échiquier');
            return false;
        } else {
            if (echiquier.isOccupied(i, j) && this.color === echiquier.getPosition(i,j).color) {
                return false;
            } 
            return true; 
        }
    }

    canAttack(echiquier, i, j) {
        return this.canMove(echiquier, i, j);
    }
}


/* ********* PION ********** */

class Pion extends Piece {

    constructor(color, i, j) {
        super(color, i, j);
        this.symbol = color === "white" ? "\u2659" : "\u265F";
    }

    canAttack(echiquier, i, j) {
        if (!super.canMove(echiquier, i, j)) {
            return false; 
        }
        // capture adversaire
        if (this.color === "white") {
            if (this.i +1 === i && (this.j +1 === j || this.j -1 === j)) {
                return true;
            }
        } else {
            if (this.i -1 === i && (this.j +1 === j || this.j -1 === j)) {
                return true;
            }
        } 
    }
    
    /**
     * règles de déplacement du pion 
     * @returns {boolean} 
     */
    canMove(echiquier, i, j) {
        if (!super.canMove(echiquier, i, j)) {
            return false; 
        }
       
        if (echiquier.isOccupied(i, j)) {
            return false;
        }

        // Pion blanc 
        if (this.color === "white") {
            // Avance de 2 cases
            if (this.i === 1 && i === 3 && this.j === j) {
                return !echiquier.isOccupied(2, j);  
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
                return !echiquier.isOccupied(5, j); 
                
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

    canMove(echiquier,  i, j) {
        if (!super.canMove(echiquier, i, j)) {
            return false; 
        }
    
        // Avance sur meme ligne i horiz
        if (this.i === i) {
            let minJ, maxJ;
            if (this.j < j) {
                minJ = this.j +1;
                maxJ = j -1;
            } else {
                minJ = j +1;
                maxJ = this.j -1;
            }
            // de position de la tour +1 à destination -1
            for (let col = minJ; col <= maxJ; col++) {
                if (echiquier.isOccupied(i, col)) {
                    return false; 
                }
            }

            return true;
        }

        // Avance sur meme col j verticale
        if (this.j === j) {
            let minI, maxI;
            if (this.i < i) {
                minI = this.i +1;
                maxI = i -1;
            } else {
                minI = i +1;
                maxI = this.i -1;
            }
            for (let row = minI; row <= maxI; row++) {
                if (echiquier.isOccupied(row, j)) {
                    return false; 
                }
            }

            return true;
        }

        return false;
    }
}

/* ********* CAVALIER ********** */

class Cavalier extends Piece {

    constructor(color, i, j) {
        super(color, i, j);
        this.symbol = color === "white" ? "\u2658" : "\u265E";
    }

    canMove(echiquier, i, j) {
        if (!super.canMove(echiquier, i, j)) {
            return false; 
        }

        const mouvementsPossibles = [
            [2, 1], [1, 2], [-1, 2], [-2, 1],
            [-2, -1], [-1, -2], [1, -2], [2, -1]
        ];

        for (let k = 0; k < mouvementsPossibles.length; k++) {
            const diffRow = mouvementsPossibles[k][0];
            const diffCol = mouvementsPossibles[k][1];
            
            if (this.i - i === diffRow && this.j - j === diffCol) {
                return true;
            }
        }

        return false;
    }
}

/* ********* FOU ********** */

class Fou extends Piece {

    constructor(color, i, j) {
        super(color, i, j);
        this.symbol = color === "white" ? "\u2657" : "\u265D";
    }

    canMove(echiquier, i, j) {
        if (!super.canMove(echiquier, i, j)) {
            return false; 
        }

        // Check diagonale: this.i - i === this.j - j Ex: (1,1), (2,2), (3,3) ou (1,-1), (2,-2), (3,-3)
        if (Math.abs(this.i - i) !== Math.abs(this.j - j)) {
            return false;
        }

        // direction i: bas ou haut et j: droite ou gauche
        let pasDeI = i > this.i ? 1 : -1;  
        let pasDeJ = j > this.j ? 1 : -1;
        // diagonale i et j
        let diagI = this.i + pasDeI;
        let diagJ = this.j + pasDeJ; 
        // check si les cases entre this.i et this.j sont occupées
        while (diagI !== i && diagJ !== j) {
            if (echiquier.isOccupied(diagI, diagJ)) {
                return false; 
            }
            diagI += pasDeI;
            diagJ += pasDeJ;
        }

        return true;
    }
}

/* ********* REINE ********** */

class Reine extends Piece {

    constructor(color, i, j) {
        super(color, i, j);
        this.symbol = color === "white" ? "\u2655" : "\u265B";
    }

    canMove(echiquier, i, j) {
        if (!super.canMove(echiquier, i, j)) {
            return false; 
        }

        // comme le fou et la tour 
        let newTour = new Tour(this.color, this.i, this.j);
        let newFou = new Fou(this.color, this.i, this.j);

        return newTour.canMove(echiquier, i, j) || newFou.canMove(echiquier, i, j);
    }

}

/* ********* ROI ********** */

class Roi extends Piece {

    constructor(color, i, j) {
        super(color, i, j);
        this.symbol = color === "white" ? "♔" : "♚";
    }

    canMove(echiquier, i, j) {
        if (!super.canMove(echiquier, i, j)) {
            return false; 
        }

        let diffRow = Math.abs(this.i - i);
        let diffCol = Math.abs(this.j - j);

        return (diffRow <= 1 && diffCol <= 1) //bool
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
                //console.log(`Position actuelle de la piece : ${i} ${j}`);
                return this.listePieces[k];
            }
        }

        return null;
    }

    isOccupied(i, j) {
        for (const piece of this.listePieces) {
            if (piece.i === i && piece.j === j) {
                //console.log("Case occupée");
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