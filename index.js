console.log(window.innerHeight, window.innerWidth);
const game = new Game({
	width: window.innerWidth,
	height: window.innerHeight,
});
document.body.prepend(game);
