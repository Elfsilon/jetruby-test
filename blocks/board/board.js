class Board {
	constructor(rowsCount, columnsCount, boardWidth) {
		this.root = document.createElement('div');
		this.root.classList.add('board');
		this.root.style.width = boardWidth + 'px';

		this.cellBorderSize = 5;
		this.cellMargin = 5;
		this.cellsCount = rowsCount * columnsCount;
		let cellAdditionalSpace = this.cellBorderSize + this.cellMargin;

		this.cellSize = (boardWidth - columnsCount * cellAdditionalSpace) / columnsCount;
		console.log(this.cellSize, boardWidth);

		return this.render();
	}

	render() {
		for (let i = 0; i < this.cellsCount; i++) {
			let cell = document.createElement('div');
			cell.classList.add('board__cell');
			cell.style.width = `${this.cellSize}px`;
			cell.style.height = `${this.cellSize}px`;
			this.root.append(cell);
		}
		return this.root;
	}
}
