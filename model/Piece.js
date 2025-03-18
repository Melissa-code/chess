class Piece {
  
  constructor(color, i, j) {
    this.color = color;
    this.i = i;
    this.j = j;
    this.isMoved = false;
    this.oldPosition = {
      i: i,
      j: j,
    };
  }

  canMove(echiquier, i, j) {
    if (i < 0 || i > 7 || j < 0 || j > 7) {
      return false;
    } else {
      if (
        echiquier.isOccupied(i, j) &&
        this.color === echiquier.getPosition(i, j).color
      ) {
        return false;
      }
      return true;
    }
  }

  canAttack(echiquier, i, j) {
    return this.canMove(echiquier, i, j);
  }
}

export default Piece;
