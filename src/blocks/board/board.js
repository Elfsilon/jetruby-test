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
		this.colors = this.pickColors(this.cellsCount / 2);

		let cellAdditionalSpace = this.cellBorderSize + this.cellMargin;
		this.cellSize = (boardWidth - columnsCount * cellAdditionalSpace) / columnsCount;

		return this.render();
	}

	selectCell(target) {
		if (this.activeCell) {
			// target.style.backgroundColor = this.colors[target.dataset.id].hsl;
			target.style.backgroundColor = this.colors[target.getAttribute('data-id')].hsl;
			target.parentNode.classList.add('board_blocked');
			setTimeout(() => {
				// if (target.dataset.id == this.activeCell.dataset.id) {
				if (target.getAttribute('data-id') == this.activeCell.getAttribute('data-id')) {
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
			// this.activeCell.style.backgroundColor = this.colors[target.dataset.id].hsl;
			this.activeCell.style.backgroundColor = this.colors[target.getAttribute('data-id')].hsl;
		}
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

	createCells() {
		let cellColors = this.colors.concat(this.colors);
		cellColors = shuffleArray(cellColors);
		const res = [];

		for (let i = 0; i < this.cellsCount; i++) {
			const cell = new Cell(this.cellSize);
			cell.classList.add('board__cell');
			// cell.dataset.id = cellColors[i].id;
			cell.setAttribute('data-id', cellColors[i].id);
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
