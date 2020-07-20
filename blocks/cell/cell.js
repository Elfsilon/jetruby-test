class Cell {
	constructor(size) {
		this.root = document.createElement('div');
		this.root.classList.add('cell');
		this.root.style.width = `${size}px`;
		this.root.style.height = `${size}px`;
		// this.root.style.backgroundColor = color;
		return this.root;
	}
}
