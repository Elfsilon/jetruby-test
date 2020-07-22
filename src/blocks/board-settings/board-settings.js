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
		let highlightColor =
			curRow % 2 != 0 || curCol % 2 != 0 ? 'board-settings__cell_highlight' : 'board-settings__cell_highlight_wrong';
		for (let i = 0; i < this.cells.length; i++) {
			if (this.cells[i].classList.contains('board-settings__cell_highlight')) {
				this.cells[i].classList.remove('board-settings__cell_highlight');
			}
			if (this.cells[i].classList.contains('board-settings__cell_highlight_wrong')) {
				this.cells[i].classList.remove('board-settings__cell_highlight_wrong');
			}
			if (this.cells[i].getAttribute('data-row') <= curRow && this.cells[i].getAttribute('data-col') <= curCol) {
				this.cells[i].classList.add(highlightColor);
			}
		}
	}

	highlightPreviousRect() {
		this.highlightRect(this.selectedCell.getAttribute('data-row'), this.selectedCell.getAttribute('data-col'));
	}

	selectSize(target, curRow, curCol) {
		if (curRow % 2 != 0 || curCol % 2 != 0) {
			this.selectedCell = target;
			this.boardRows = +target.getAttribute('data-row') + 1;
			this.boardCols = +target.getAttribute('data-col') + 1;
			this.sizeNode.textContent = `${this.boardRows}x${this.boardCols}`;
		}
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
			if (e.target.classList.contains('board-settings__cell'))
				this.highlightRect(e.target.getAttribute('data-row'), e.target.getAttribute('data-col'));
		});
		board.addEventListener('mouseleave', () => this.highlightPreviousRect());
		board.addEventListener('click', (e) => {
			if (e.target.classList.contains('board-settings__cell'))
				this.selectSize(e.target, e.target.getAttribute('data-row'), e.target.getAttribute('data-col'));
		});

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const cell = document.createElement('div');
				cell.classList.add('board-settings__cell', 'cell');
				cell.setAttribute('data-row', i);
				cell.setAttribute('data-col', j);
				if (i < 4 && j < 4) cell.classList.add('board-settings__cell_highlight');
				if (window.innerWidth <= 600 && (i > 5 || j > 5)) cell.classList.add('board-settings__cell_disabled');
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
