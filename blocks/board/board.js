class Board {
	constructor(rowsCount, columnsCount, boardWidth) {
		this.root = document.createElement('div');
		this.root.classList.add('board');
		this.root.style.width = boardWidth + 'px';

		this.activeCell = null;
		this.root.addEventListener('click', (e) => {
			if (
				!e.target.parentNode.classList.contains('board_blocked') &&
				!e.target.classList.contains('cell_disabled') &&
				e.target.classList.contains('cell')
			) {
				if (this.activeCell) {
					e.target.style.backgroundColor = this.colors[e.target.dataset.id].hsl;
					e.target.parentNode.classList.add('board_blocked');
					setTimeout(() => {
						if (e.target.dataset.id == this.activeCell.dataset.id) {
							console.log('equal');
							e.target.classList.add('cell_disabled');
							this.activeCell.classList.add('cell_disabled');
						} else {
							e.target.style.backgroundColor = 'white';
							this.activeCell.style.backgroundColor = 'white';
						}
						this.activeCell = null;
						e.target.parentNode.classList.remove('board_blocked');
					}, 500);
				} else {
					this.activeCell = e.target;
					this.activeCell.style.backgroundColor = this.colors[e.target.dataset.id].hsl;
				}
			}
		});

		this.cellBorderSize = 5;
		this.cellMargin = 5;
		this.cellsCount = rowsCount * columnsCount;
		let cellAdditionalSpace = this.cellBorderSize + this.cellMargin;

		this.colors = this.pickColors(this.cellsCount / 2);
		this.cellSize = (boardWidth - columnsCount * cellAdditionalSpace) / columnsCount;

		return this.render();
	}

	pickColors(count) {
		const colors = [];
		if (count <= 14) {
			for (let i = 0; i < count; i++) {
				colors.push({
					id: i,
					hsl: `hsl(${25 * i}, 90%, 50%)`,
				});
			}
		} else {
			for (let i = 0; i < count; i++) {
				colors.push({
					id: i,
					hsl: `hsl(${10 * i}, 90%, 50%)`,
				});
			}
		}
		return colors;
	}

	render() {
		let cellColors = this.colors.concat(this.colors);
		cellColors = shuffleArray(cellColors);

		for (let i = 0; i < this.cellsCount; i++) {
			const cell = new Cell(this.cellSize);
			cell.classList.add('board__cell');
			cell.dataset.id = cellColors[i].id;
			this.root.append(cell);
		}

		return this.root;
	}
}
