class Board {
	constructor(cellsCount, columnsCount, boardWidth, incSolved, checkFinish) {
		this.root = null;
		this.activeCell = null;
		this.checkFinish = checkFinish;
		this.incSolved = incSolved;
		this.boardWidth = boardWidth;
		this.cellBorderSize = 5;
		this.cellMargin = 5;
		this.cellsCount = cellsCount;
		this.columnsCount = columnsCount;
		this.rowsCount = cellsCount / columnsCount;
		this.colors = this.pickColors(Math.floor(this.cellsCount / 2 + 0.5));

		let cellAdditionalSpace = this.cellBorderSize + this.cellMargin;
		this.cellSize = (boardWidth - columnsCount * cellAdditionalSpace) / columnsCount;

		return this.render();
	}

	selectCell(target) {
		if (this.activeCell) {
			target.style.backgroundColor = this.colors[target.getAttribute('data-color-id')].hsl;
			target.parentNode.classList.add('board_blocked');
			setTimeout(() => {
				if (
					target.getAttribute('data-id') != this.activeCell.getAttribute('data-id') &&
					target.getAttribute('data-color-id') == this.activeCell.getAttribute('data-color-id')
				) {
					target.classList.add('cell_disabled');
					this.activeCell.classList.add('cell_disabled');
					this.incSolved();
				} else {
					target.style.backgroundColor = 'white';
					this.activeCell.style.backgroundColor = 'white';
				}
				this.activeCell = null;
				target.parentNode.classList.remove('board_blocked');
				this.checkFinish();
			}, 500);
		} else {
			this.activeCell = target;
			this.activeCell.style.backgroundColor = this.colors[target.getAttribute('data-color-id')].hsl;
		}
	}

	pickColors(count) {
		const colors = [];
		for (let i = 0; i < 41; i++) {
			let brightness;
			if (i < 11) brightness = 50;
			if (i >= 11 && i < 22) brightness = 40;
			if (i >= 22 && i < 33) brightness = 30;
			if (i >= 33 && i < 41) brightness = 20;

			colors.push({
				id: i,
				hsl: `hsl(${32 * i}, 90%, ${brightness}%)`,
			});
		}
		return colors.slice(0, count);
	}

	createCells() {
		let cellColors = this.colors.concat(this.colors);
		cellColors = shuffleArray(cellColors);
		const res = [];

		for (let i = 0; i < this.cellsCount; i++) {
			const cell = new Cell(this.cellSize);
			cell.classList.add('board__cell');
			if (this.columnsCount > 4 || this.rowsCount > 4) cell.classList.add('cell_border_s');
			cell.setAttribute('data-color-id', cellColors[i].id);
			cell.setAttribute('data-id', i);
			res.push(cell);
		}

		return res;
	}

	render() {
		this.root = document.createElement('div');
		this.root.classList.add('board');
		this.root.style.width = this.boardWidth + 'px';
		this.root.addEventListener('click', (e) => {
			if (
				!e.target.parentNode.classList.contains('board_blocked') &&
				!e.target.classList.contains('cell_disabled') &&
				e.target.classList.contains('cell')
			) {
				this.selectCell(e.target);
			}
		});

		for (const cell of this.createCells()) {
			this.root.appendChild(cell);
		}

		return this.root;
	}
}
