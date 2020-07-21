"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function Cell(size) {
  _classCallCheck(this, Cell);

  this.root = document.createElement('div');
  this.root.classList.add('cell');
  this.root.style.width = "".concat(size, "px");
  this.root.style.height = "".concat(size, "px"); // this.root.style.backgroundColor = color;

  return this.root;
};