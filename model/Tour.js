import Piece from './Piece.js'; 

class Tour extends Piece {

  constructor(color, i, j) {
    super(color, i, j);
    this.symbol = color === "white" ? "\u2656" : "\u265C";
  }

  canMove(echiquier, i, j) {
    if (!super.canMove(echiquier, i, j)) {
      return false;
    }

    // Avance sur meme ligne i horiz
    if (this.i === i) {
      let minJ, maxJ;
      if (this.j < j) {
        minJ = this.j + 1;
        maxJ = j - 1;
      } else {
        minJ = j + 1;
        maxJ = this.j - 1;
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
        minI = this.i + 1;
        maxI = i - 1;
      } else {
        minI = i + 1;
        maxI = this.i - 1;
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

export default Tour;