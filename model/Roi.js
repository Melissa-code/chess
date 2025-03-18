import Piece from "./Piece.js";
import Tour from "./Tour.js";

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

    return diffRow <= 1 && diffCol <= 1; //bool
  }

  canRoque(echiquier, i, j) {
    if (j === this.j + 2) {
      return this.canRoqueRight(echiquier);
    } else if (j === this.j - 2) {
      return this.canRoqueLeft(echiquier);
    }
  }

  canRoqueRight(echiquier) {
    // Check roi ne doit pas avoir bougé
    if (this.isMoved) return false;
    let row = this.i; //0 ou 7

    if (
      (this.color === "white" && row !== 0) ||
      (this.color !== "white" && row !== 7)
    )
      return false;
    let tour = echiquier.getPosition(row, 7);

    if (!tour || !(tour instanceof Tour) || tour.isMoved) return false;

    if (echiquier.isOccupied(row, 5) || echiquier.isOccupied(row, 6))
      return false;

    if (echiquier.checkIfKingIsInCheck(this)) return false;

    return true;
  }

  canRoqueLeft(echiquier) {
    // Check roi ne doit pas avoir bougé
    if (this.isMoved) return false;
    let row = this.i; //0 ou 7

    if (
      (this.color === "white" && row !== 0) ||
      (this.color !== "white" && row !== 7)
    )
      return false;
    let tour = echiquier.getPosition(row, 0);

    if (!tour || !(tour instanceof Tour) || tour.isMoved) return false;

    if (
      echiquier.isOccupied(row, 1) ||
      echiquier.isOccupied(row, 2) ||
      echiquier.isOccupied(row, 3)
    )
      return false;

    if (echiquier.checkIfKingIsInCheck(this)) return false;

    return true;
  }
}

export default Roi;