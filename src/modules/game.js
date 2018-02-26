import { Board } from "./board";

export class Game {
	constructor() {
		this.board = new Board();
		console.log('x');
	}

	init() {
		this.board.init();
	}
}