class Menu {
	constructor(openBoardSettings, startGame, boardRows = 4, boardCols = 4) {
		this.root = null;
		this.sizeNode = null;
		this.openBoardSettings = openBoardSettings;
		this.startGame = startGame;
		this.currentRows = boardRows;
		this.currentCols = boardCols;

		return this.render();
	}

	render() {
		this.root = document.createElement('div');
		this.root.classList.add('menu');

		const caption = document.createElement('h1');
		caption.textContent = 'Memory Game';
		caption.classList.add('menu__caption', 'text', 'text_fs_l');

		const text = document.createElement('p');
		text.textContent = 'Board size:';
		text.classList.add('menu__text', 'tex', 'text_fs_s', 'text_col_bright');

		const size = document.createElement('p');
		size.textContent = `${this.currentRows}x${this.currentCols}`;
		size.classList.add('menu__text', 'text', 'text_fs_m');
		this.sizeNode = size;

		const changeSizeButton = document.createElement('button');
		changeSizeButton.textContent = 'Change';
		changeSizeButton.classList.add('menu__change-size-button', 'button', 'button_size_s', 'button_bright');
		changeSizeButton.addEventListener('click', () => this.openBoardSettings());

		const startGameButton = document.createElement('button');
		startGameButton.textContent = 'Start Game';
		startGameButton.classList.add('menu__start-game-button', 'button', 'button_size_l');
		startGameButton.addEventListener('click', () => this.startGame());

		this.root.append(caption, text, size, changeSizeButton, startGameButton);
		return this.root;
	}
}
