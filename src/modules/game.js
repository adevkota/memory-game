import { Board } from "./board";

export class Game {
	constructor() {
		this.board = new Board();
	}

	init() {
		this.board.init();
	}
}