export class Tile {
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