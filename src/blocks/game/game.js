class Game {
	constructor({ width, height }) {
		this.root = null;
		this.settings = {
			boardWidth: null,
			boardRows: 4,
			boardCols: 4,
			boardCellsCount: 16,
			gameWidth: width,
			gameHeight: height,
		};
		this.state = {
			solved: 0,
			needToSolve: 8,
		};

		this.setBoardSize = this.setBoardSize.bind(this);
		this.setBoardWidth = this.setBoardWidth.bind(this);
		this.openBoardSettings = this.openBoardSettings.bind(this);
		this.startGame = this.startGame.bind(this);
		this.incSolved = this.incSolved.bind(this);
		this.checkFinish = this.checkFinish.bind(this);

		this.modal = new Modal();
		this.boardSettingsWindow = new BoardSettingsWindow(
			this.settings.boardRows,
			this.settings.boardCols,
			this.setBoardSize,
			this.modal.close
		);
		this.menu = new Menu(this.openBoardSettings, this.startGame);

		return this.render();
	}

	incSolved() {
		this.state.solved++;
	}

	checkFinish() {
		if (this.state.solved == this.state.needToSolve) this.showFinalMessage();
	}

	refreshState() {
		this.state.solved = 0;
	}

	showFinalMessage() {
		const wrapper = document.createElement('div');
		wrapper.classList.add('board__wrapper');

		const caption = document.createElement('h2');
		caption.classList.add('text', 'text_fs_m');
		caption.textContent = 'Perfect';

		const subtitle = document.createElement('p');
		subtitle.classList.add('text', 'text_fs_s');
		subtitle.textContent = 'You are awesome!';

		this.boardNode.innerHTML = '';
		wrapper.append(caption, subtitle);
		this.boardNode.append(wrapper);
	}

	setBoardSize(rows, cols) {
		this.settings.boardRows = rows;
		this.settings.boardCols = cols;
		this.settings.boardCellsCount = rows * cols;
		this.state.needToSolve = this.settings.boardCellsCount / 2;
		this.menu = new Menu(this.openBoardSettings, this.startGame, this.settings.boardRows, this.settings.boardCols);
		this.root.innerHTML = '';
		this.root.append(this.menu);
	}

	/**
	 * Calculates board width considering the width and height of the viewport, count of board columns and rows
	 */
	setBoardWidth(minBoardFactor, maxBoardFactor) {
		let minWH = Math.min(this.settings.gameWidth, this.settings.gameHeight);
		let step = (maxBoardFactor - minBoardFactor) / 7;
		let colsFactor = this.settings.boardCols - 2;
		let rowsFactor = 9 - this.settings.boardRows;
		let factor = Math.min(minBoardFactor + step * (colsFactor + rowsFactor * 0.5), maxBoardFactor);

		this.settings.boardWidth = minWH * factor;
	}

	openBoardSettings() {
		this.modal.open(this.boardSettingsWindow);
	}

	openMenu() {
		this.root.innerHTML = '';
		this.root.append(this.menu);
	}

	startGame() {
		this.refreshState();
		this.setBoardWidth(0.15, 0.6);
		this.root.innerHTML = '';
		const board = new Board(
			this.settings.boardCellsCount,
			this.settings.boardCols,
			this.settings.boardWidth,
			this.incSolved,
			this.checkFinish
		);
		board.classList.add('game__board');
		this.boardNode = board;

		const wrapper = document.createElement('div');
		wrapper.classList.add('game__wrapper');

		const backToMenuButton = document.createElement('button');
		backToMenuButton.classList.add('game__button-back', 'button', 'button_size_m', 'button_bright');
		backToMenuButton.textContent = 'Menu';
		backToMenuButton.addEventListener('click', () => this.openMenu());

		const restartButton = document.createElement('button');
		restartButton.classList.add('button', 'button_size_m', 'button_bright');
		restartButton.textContent = 'Restart';
		restartButton.addEventListener('click', () => this.startGame());

		wrapper.append(backToMenuButton, restartButton);
		this.root.append(board, wrapper);
	}

	render() {
		this.root = document.createElement('div');
		this.root.classList.add('game');
		this.root.style.width = this.settings.gameWidth + 'px';
		this.root.style.height = this.settings.gameHeight + 'px';

		this.root.append(this.menu);

		return this.root;
	}
}
