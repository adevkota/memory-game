class Game {
	constructor() {
		this.board = new Board();
	}

	init() {
		this.board.init();
	}
}

class Board {
	constructor(myWindow) {
		this.window = myWindow || window;
		this.tilesArray = [];
		this.boardSize = 24;

		this.flippedTile = null;

		//time to display the tile value in seconds
		this.flippedTileTimeout = 2;

		this.boardElement = document.querySelector('#board');
		this.board = '';
		this.boardReady = false;
	}

	init() {
		for (let i = 0; i < this.boardSize; i++) {
			let tile = new Tile(i, i%12);
			this.tilesArray.push(tile);
		}
		this.render();
		this.boardElement.addEventListener("click", (e) => {this.onClick(e)});
		this.boardReady = true;
	}
	
	onClick(event) {
		if(this.boardReady && event.target && event.target.classList.contains("tile")) {
			let tileNum = event.target.dataset.index;

			//ignore click on the same tile
			if( this.flippedTile === tileNum) {
				return;
			}
			this.update(tileNum);
		}
	}
	render() {
		this.board = this.tilesArray.reduce((acc, curVal) => {
			return acc+curVal.render()
		}, '');
		this.boardElement.innerHTML = this.board;
	}

	tilesMatch(currentFlipped, newFlipped) {
		return this.tilesArray[currentFlipped].value === this.tilesArray[newFlipped].value;
	}

	update(tileNum) {
		this.boardReady = false;
		this.tilesArray[tileNum].flip();
		this.render();
		
		if(this.flippedTile === null) {
			this.flippedTile = tileNum;
			this.boardReady = true;
		} else {
			this.window.setTimeout(() => {
				if(this.tilesMatch(this.flippedTile, tileNum)) {
					this.tilesArray[tileNum].markSolved();
					this.tilesArray[this.flippedTile].markSolved();
				} else {
					this.tilesArray[tileNum].flip();
					this.tilesArray[this.flippedTile].flip();
				}

				this.flippedTile = null;
				this.render();
				this.boardReady = true;
			}, this.flippedTileTimeout*1000)
		}
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

	markSolved() {
		this.isSolved = true;
	}
	render(){
		return `<div 
			class="tile"
			data-index = ${this.index}
			style = "${this.isSolved? 'visibility:hidden': ''}">
				${this.isFlipped? this.value : ''}
			</div>`
	}
}

let game = new Game();
game.init();