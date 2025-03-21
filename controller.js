import Echiquier from './model/Echiquier.js';
import View from './View.js';

const echiquier = new Echiquier();
let caseSize = window.innerWidth < 600 ? 43 : 65;
const view = new View(echiquier, document, caseSize);

function updateBoardSize() {
  let newSize = window.innerWidth < 600 ? 43 : 65;
  view.updateSize(newSize);
}

window.addEventListener("resize", updateBoardSize);