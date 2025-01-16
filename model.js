/* ************************************************************** */
/*        Pièces du jeu                                           */
/* ************************************************************** */

class Piece {

    constructor(color) {
        this.color = color;
      }
}


class Pion extends Piece {

    constructor(color) {
        super(color);
        this.symbol = color === "white" ? "\u2659" : "\u265F";
    }
}

class Tour extends Piece {

    constructor(color) {
        super(color);
        this.symbol = color === "white" ? "\u2656" : "\u265C";
    }
}

class Cavalier extends Piece {

    constructor(color) {
        super(color);
        this.symbol = color === "white" ? "\u2658" : "\u265E";
    }
}

class Fou extends Piece {

    constructor(color) {
        super(color);
        this.symbol = color === "white" ? "\u2657" : "\u265D";
    }
}

class Reine extends Piece {

    constructor(color) {
        super(color);
        this.symbol = color === "white" ? "\u2655" : "\u265B";
    }
}

class Roi extends Piece {

    constructor(color) {
        super(color);
        this.symbol = color === "white" ? "♔" : "♚";
    }
}

/* ************************************************************** */
/*        Fabrique Pièce (factory)                                */
/* ************************************************************** */

class PieceFactory {

    static createPiece(type, color) {
        switch(type) {
            case "pion": 
                return new Pion(color);
            case "tour": 
                return new Tour(color); 
            case "cavalier": 
                return new Cavalier(color); 
            case "fou":   
                return new Fou(color); 
            case "reine":   
                return new Reine(color); 
            case "roi": 
                return new Roi(color); 
            default: 
                console.log("Aucune pièce fabriquée"); 
                return null; 
        }  
    }
}


/* ************************************************************** */
/*        Plateau jeu                                             */
/* ************************************************************** */

class Echiquier {

    constructor() {
        this.matrice = []; 
        this.hauteur = 8; 
        this.largeur = 8; 
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
            // ligne créée
            let row = []; 

            for(let j = 0; j < this.largeur; j++) {
                // 1re ligne (des blancs)
                if (i === 0) {
                    row.push(PieceFactory.createPiece(this.getTypeOfPiece(j), "white"));
                } else if (i === 1) {
                    row.push(PieceFactory.createPiece("pion", "white")); 
                } else if (i === 6) {
                    row.push(PieceFactory.createPiece("pion", "black")); 
                } else if (i === 7) {
                    row.push(PieceFactory.createPiece(this.getTypeOfPiece(j), "black"));
                }
            }

            // ligne remplie 
            this.matrice.push(row);
        }
    }
}

