import Piece from './Piece.js'; 

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
      if (this.i + 1 === i && (this.j + 1 === j || this.j - 1 === j)) {
        return true;
      }
    } else {
      if (this.i - 1 === i && (this.j + 1 === j || this.j - 1 === j)) {
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
        return true;
      }
      return false;
    }
  }
}

export default Pion; 
