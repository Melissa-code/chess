import Piece from "./Piece.js";
import Tour from "./Tour.js";
import Fou from "./Fou.js";

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

export default Reine; 