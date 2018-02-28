import { Board } from "./board";

export class Game {
	constructor(myWindow) {
		this.window = myWindow || window;
		this.board = new Board();

		this.controlElements = {
			shuffle: this.window.document.querySelector('#shuffleOption'),
		} 
		this.controlElements.shuffle.addEventListener('change', (e) => {
			this.onClick(e);
		});
	}
	
	init() {
		let shuffleValues = this.controlElements.shuffle.checked;
		this.board.init(shuffleValues);
	}

	onClick(e) {
		this.init();
	}
}