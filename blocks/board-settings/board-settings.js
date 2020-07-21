class BoardSettingsWindow {
	constructor(boardRows, boardCols, setBoardSize, closeModal) {
		this.root = null;
		this.cells = null;
		this.selectedCell = null;
		this.boardRows = boardRows;
		this.boardCols = boardCols;
		this.setBoardSize = setBoardSize;
		this.closeModal = closeModal;
		return this.render();
	}

	highlightRect(curRow, curCol) {
		for (let i = 0; i < this.cells.length; i++) {
			if (this.cells[i].classList.contains('board-settings__cell_highlight')) {
				this.cells[i].classList.remove('board-settings__cell_highlight');
			}
			if (this.cells[i].dataset.row <= curRow && this.cells[i].dataset.col <= curCol) {
				this.cells[i].classList.add('board-settings__cell_highlight');
			}
		}
	}

	highlightPreviousRect() {
		this.highlightRect(this.selectedCell.dataset.row, this.selectedCell.dataset.col);
	}

	selectSize(target) {
		this.selectedCell = target;
		this.boardRows = +target.dataset.row + 1;
		this.boardCols = +target.dataset.col + 1;
		this.sizeNode.textContent = `${this.boardRows}x${this.boardCols}`;
	}

	apply() {
		this.setBoardSize(this.boardRows, this.boardCols);
		this.closeModal();
	}

	render() {
		this.root = document.createElement('div');
		this.root.classList.add('board-settings');

		const board = document.createElement('div');
		board.classList.add('board-settings__board', 'board');
		board.addEventListener('mousemove', (e) => {
			if (e.target.classList.contains('board-settings__cell')) this.highlightRect(e.target.dataset.row, e.target.dataset.col);
		});
		board.addEventListener('mouseleave', () => this.highlightPreviousRect());
		board.addEventListener('click', (e) => {
			if (e.target.classList.contains('board-settings__cell')) this.selectSize(e.target);
		});

		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				const cell = document.createElement('div');
				cell.classList.add('board-settings__cell', 'cell');
				cell.dataset.row = i;
				cell.dataset.col = j;
				if (i < 4 && j < 4) cell.classList.add('board-settings__cell_highlight');
				if (i == 3 && j == 3) this.selectedCell = cell;
				board.append(cell);
			}
		}

		this.cells = board.childNodes;

		const info = document.createElement('div');
		info.classList.add('board-settings__info');

		const caption = document.createElement('h3');
		caption.classList.add('board-settings__caption', 'text', 'text_fs_xs');
		caption.textContent = 'Board size:';

		const size = document.createElement('p');
		size.classList.add('board-settings__size', 'text', 'text_fs_xs');
		size.textContent = `${this.boardRows}x${this.boardCols}`;
		this.sizeNode = size;

		const applyButton = document.createElement('button');
		applyButton.classList.add('button', 'button_size_s');
		applyButton.textContent = 'Apply';
		applyButton.addEventListener('click', () => this.apply());

		info.append(caption, size, applyButton);
		this.root.append(board, info);
		return this.root;
	}
}
