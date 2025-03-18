import Piece from "./Piece.js";

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

export default Fou; 