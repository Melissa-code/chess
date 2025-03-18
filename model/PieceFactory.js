import Pion from "./Pion.js";
import Tour from "./Tour.js";
import Cavalier from "./Cavalier.js";
import Fou from "./Fou.js";
import Reine from "./Reine.js";
import Roi from "./Roi.js";

class PieceFactory {

  static createPiece(type, color, i, j) {
    switch (type) {
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

export default PieceFactory;
