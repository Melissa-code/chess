import PieceFactory from "./PieceFactory.js";
import Roi from "./Roi.js";

class Echiquier {
    
  constructor() {
    this.hauteur = 8;
    this.largeur = 8;
    this.listePieces = [];
    this.initGame();
    this.pieceSelectionnee = null;
    this.tourDuJoueur = "white";
    this.gameOver = false;
    this.inCheck = false;
  }

  getTypeOfPiece(col) {
    switch (col) {
      case 0:
      case 7:
        return "tour";
      case 1:
      case 6:
        return "cavalier";
      case 2:
      case 5:
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
      for (let j = 0; j < this.largeur; j++) {
        // 1re ligne (des blancs)
        if (i === 0) {
          this.listePieces.push(
            PieceFactory.createPiece(this.getTypeOfPiece(j), "white", i, j)
          );
        } else if (i === 1) {
          this.listePieces.push(
            PieceFactory.createPiece("pion", "white", i, j)
          );
        } else if (i === 6) {
          this.listePieces.push(
            PieceFactory.createPiece("pion", "black", i, j)
          );
        } else if (i === 7) {
          this.listePieces.push(
            PieceFactory.createPiece(this.getTypeOfPiece(j), "black", i, j)
          );
        }
      }
    }
  }

  getPosition(i, j) {
    for (let k = 0; k < this.listePieces.length; k++) {
      if (this.listePieces[k].i === i && this.listePieces[k].j === j) {
        return this.listePieces[k];
      }
    }

    return null;
  }

  isOccupied(i, j) {
    for (const piece of this.listePieces) {
      if (piece.i === i && piece.j === j) {
        return true;
      }
    }
    return false;
  }

  deplacerPiece(piece, i, j) {
    piece.oldPosition = {
      i: piece.i,
      j: piece.j,
    };
    piece.i = i;
    piece.j = j;
    piece.isMoved = true;
  }

  //pièces restantes
  remainedPieces(color) {
    let nbPiecesRestantes = 0;

    for (let k = 0; k < this.listePieces.length; k++) {
      if (this.listePieces[k].color == color) {
        nbPiecesRestantes++;
      }
    }

    return nbPiecesRestantes;
  }

  deletePiece(piece) {
    for (let k = 0; k < this.listePieces.length; k++) {
      if (this.listePieces[k] === piece) {
        this.listePieces.splice(k, 1);
        break;
      }
    }
  }

  gestionClic(i, j) {
    if (this.gameOver) {
      return;
    }

    const piece = this.getPosition(i, j);
    let moveCompleted = false;

    if (!this.pieceSelectionnee) {
      if (
        piece &&
        ((this.tourDuJoueur === "white" && piece.color === "white") ||
          (this.tourDuJoueur === "black" && piece.color !== "white"))
      ) {
        this.pieceSelectionnee = piece;
      }
    } else {
      const monRoi = this.findKing(this.tourDuJoueur);
      let oldi = this.pieceSelectionnee.i;
      let oldj = this.pieceSelectionnee.j;

      // roque roi tour
      if (this.pieceSelectionnee instanceof Roi) {
        let row = this.pieceSelectionnee.i;
        let col = this.pieceSelectionnee.j;

        if (
          (this.pieceSelectionnee.color === "white" &&
            row === 0 &&
            col === 4) ||
          (this.pieceSelectionnee.color !== "white" && row === 7 && col === 4)
        ) {
          if (j === 6 || j === 2) {
            if (this.pieceSelectionnee.canRoque(this, row, j)) {
              this.deplacerPiece(this.pieceSelectionnee, row, j);
              let tour = this.getPosition(row, j === 6 ? 7 : 0);
              this.deplacerPiece(tour, row, j === 6 ? 5 : 3);
              moveCompleted = true;
            }
          }
        }
      }

      // si piece est nulle (case vide), faire un test canMove et si elle est occupee faire un test canAttack
      if (!piece && this.pieceSelectionnee.canMove(this, i, j)) {
        // si roi en echec apres deplacement de la piece, aucun mouvement
        // speculer le deplacer a i,j puis demande si le roi est en echec
        this.deplacerPiece(this.pieceSelectionnee, i, j);

        if (!this.checkIfKingIsInCheck(monRoi)) {
          moveCompleted = true;
        } else {
          this.inCheck = true;
          this.deplacerPiece(this.pieceSelectionnee, oldi, oldj);
        }
      }

      if (piece && this.pieceSelectionnee.canAttack(this, i, j)) {
        this.deplacerPiece(this.pieceSelectionnee, i, j);

        if (!this.checkIfKingIsInCheck(monRoi)) {
          moveCompleted = true;
          this.inCheck = false;
          this.deletePiece(piece);
        } else {
          this.deplacerPiece(this.pieceSelectionnee, oldi, oldj);
        }
      }

      this.pieceSelectionnee = null;
    }

    //déplacement bien effectué avant de switcher de tour
    if (moveCompleted) {
      // Check s'il y a échec
      const roiAdverse = this.findAdverseKing();
      let roiEnEchec = this.checkIfKingIsInCheck(roiAdverse);

      if (roiEnEchec) {
        this.inCheck = true;
      } else {
        this.inCheck = false;
      }

      if (this.isEchecEtMat()) {
        this.gameOver = true;

        return;
      }

      this.tourDuJoueur = this.tourDuJoueur === "white" ? "black" : "white";
    }
  }

  /**
   * Trouver le roi adverse
   * @returns {Object||null} adverseKing
   */
  findAdverseKing() {
    let adverseColor = this.tourDuJoueur === "white" ? "black" : "white";

    return this.findKing(adverseColor);
  }

  findKing(color) {
    for (let k = 0; k < this.listePieces.length; k++) {
      if (
        this.listePieces[k] instanceof Roi &&
        color === this.listePieces[k].color
      ) {
        return this.listePieces[k];
      }
    }

    return null;
  }

  checkIfKingIsInCheck(roiAdverse) {
    for (let k = 0; k < this.listePieces.length; k++) {
      let pieceAdverse = this.listePieces[k];

      if (
        pieceAdverse.color !== roiAdverse.color &&
        pieceAdverse.canAttack(this, roiAdverse.i, roiAdverse.j)
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check si le roi peut s'échapper/attaquer
   * @returns {boolean}
   */
  whereKingCanMove(roiAdverse) {
    let mouvementsPossibles = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    let listPositionsPossibles = [];

    for (let [x, y] of mouvementsPossibles) {
      let newPositionX = roiAdverse.i + x;
      let newPositionY = roiAdverse.j + y;
      if (
        roiAdverse.canMove(this, newPositionX, newPositionY) ||
        roiAdverse.canAttack(this, newPositionX, newPositionY)
      ) {
        listPositionsPossibles.push([newPositionX, newPositionY]);
      }
    }

    return listPositionsPossibles;
  }

  isEchecEtMat() {
    const roiAdverse = this.findAdverseKing();

    let roiEnEchec = this.checkIfKingIsInCheck(roiAdverse);
    if (!roiEnEchec) {
      return false;
    }

    let positions = this.whereKingCanMove(roiAdverse);
    for (let k = 0; k < positions.length; k++) {
      let newI = positions[k][0];
      let newJ = positions[k][1];
      let anciennePosition = { i: roiAdverse.i, j: roiAdverse.j };
      // déplacement simulé du roi adv
      roiAdverse.i = newI;
      roiAdverse.j = newJ;

      let toujoursEnEchec = this.checkIfKingIsInCheck(roiAdverse);

      // Restaure position initiale du roi adv
      roiAdverse.i = anciennePosition.i;
      roiAdverse.j = anciennePosition.j;

      if (!toujoursEnEchec) {
        return false;
      }
    }

    return true;
  }
}

export default Echiquier;
