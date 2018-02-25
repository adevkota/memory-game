class Game {
	constructor() {
		this.board = new Board();
	}

	init() {
		this.board.init();
	}
}

class Board {
	constructor() {
		this.tilesArray = [];
		this.boardSize = 24;

		this.flippedTile = null;
		this.tileId = [];
		this.tileValue = [];
		this.boardElement = document.querySelector('#board');
		this.board = '';
	}

	init() {
		for (let i = 0; i < this.boardSize; i++) {
			let tile = new Tile(i, i%12);
			this.tilesArray.push(tile);
		}
		this.render();
		this.boardElement.addEventListener("click", (e) => {this.onClick(e)})
	}
	
	onClick(event) {
		if(event.target && event.target.classList.contains("tile")) {
			this.update(event.target.dataset.index);
		}
	}
	render() {
		this.board = this.tilesArray.reduce((acc, curVal) => {
			return acc+curVal.render()
		}, '');
		this.boardElement.innerHTML = this.board;
	}

	tilesMatch(currentFlipped, newFlipped) {

	}
	update(tileNum) {
		this.tilesArray[tileNum].flip();
		if(this.flippedTile === null) {
			this.flippedTile = tileNum;
		} else {
		}
		this.render();
	}

}

class Tile {
	constructor(index, val) {
		this.index = index;
		this.value = val || index%12;
		this.isFlipped = false;
		this.isSolved = false;
	}

	flip() {
		this.isFlipped = !this.isFlipped;
	}

	render(){
		return `<div 
			class="tile"
			data-index = ${this.index}
			style = "${this.isSolved? 'display:hidden': ''}">
				${this.isFlipped? this.value : ''}
			</div>`
	}
}

let game = new Game();
game.init();