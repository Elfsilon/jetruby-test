class Game {
	constructor({ width, height }) {
		let root = document.createElement('div');
		root.classList.add('game');
		root.style.width = width + 'px';
		root.style.height = height + 'px';
		this.boardWidth = Math.min(width, height) * 0.6;
		let board = new Board(4, 4, this.boardWidth);
		root.append(board);
		return root;
	}
}
