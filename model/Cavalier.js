import Piece from "./Piece.js";

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
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
      [-2, -1],
      [-1, -2],
      [1, -2],
      [2, -1],
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

export default Cavalier; 