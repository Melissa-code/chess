import Echiquier from './model/Echiquier.js';
import View from './View.js';

const echiquier = new Echiquier();
const view = new View(echiquier, document, 65);