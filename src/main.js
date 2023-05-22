import { Instruction } from './components/instruction.js';
import { Game } from './components/game.js';

const TIME_LIMIT_IN_SEC = 3;
const NUM_OF_ITMES = 3;

const instruction = new Instruction();
const game = new Game(TIME_LIMIT_IN_SEC, NUM_OF_ITMES);
game.setGameCancelListener(instruction.show);
