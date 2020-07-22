class Effect {
	static fadeEffect(node) {
		node.classList.add('effect');
		setTimeout(() => {
			node.classList.add('effect_fade');
			setTimeout(() => {
				node.classList.remove('effect', 'effect_fade');
			}, 500);
		});
	}

	static riseEffect(node) {
		node.classList.add('effect', 'effect_rise');
		setTimeout(() => {
			node.classList.remove('effect_rise');
			setTimeout(() => {
				node.classList.remove('effect');
			}, 500);
		});
	}
}
