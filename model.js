/* ************************************************************** */
/*        Pièces du jeu                                           */
/* ************************************************************** */

class Piece {

    constructor(color, i, j) {
        this.color = color;
        this.i = i;
        this.j = j;
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


class Pion extends Piece {

    constructor(color, i, j) {
        super(color, i, j);
        this.symbol = color === "white" ? "\u2659" : "\u265F";
    }

    canMove(echiquier, i, j) {
        if(!super.canMove(echiquier, i, j)) {
            return false; 
        }
        
        //if 
        
    }
}

class Tour extends Piece {

    constructor(color, i, j) {
        super(color, i, j);
        this.symbol = color === "white" ? "\u2656" : "\u265C";
    }
}

class Cavalier extends Piece {

    constructor(color, i, j) {
        super(color, i, j);
        this.symbol = color === "white" ? "\u2658" : "\u265E";
    }
}

class Fou extends Piece {

    constructor(color, i, j) {
        super(color, i, j);
        this.symbol = color === "white" ? "\u2657" : "\u265D";
    }
}

class Reine extends Piece {

    constructor(color, i, j) {
        super(color, i, j);
        this.symbol = color === "white" ? "\u2655" : "\u265B";
    }
}

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
        for(let k = 0; k<this.listePieces.length; k++ ) {
            if(this.listePieces[k].i == i && this.listePieces[k].j == j) {
                return this.listePieces[k];
            }
        }

        return null;
    }
}

