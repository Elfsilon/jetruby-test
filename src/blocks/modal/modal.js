class Modal {
	constructor() {
		this.root = null;
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.render();
	}

	open(component) {
		if (this.root.innerHTML) this.close();
		this.root.append(component);
		this.root.classList.remove('modal_hidden');
	}

	close() {
		this.root.innerHTML = '';
		this.root.classList.add('modal_hidden');
	}

	render() {
		this.root = document.createElement('div');
		this.root.classList.add('modal', 'modal_hidden');
		document.body.append(this.root);
	}
}
