"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Menu = /*#__PURE__*/function () {
  function Menu(openBoardSettings, startGame) {
    var boardRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
    var boardCols = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4;

    _classCallCheck(this, Menu);

    this.root = null;
    this.sizeNode = null;
    this.openBoardSettings = openBoardSettings;
    this.startGame = startGame;
    this.currentRows = boardRows;
    this.currentCols = boardCols;
    return this.render();
  }

  _createClass(Menu, [{
    key: "render",
    value: function render() {
      var _this = this;

      this.root = document.createElement('div');
      this.root.classList.add('menu');
      var caption = document.createElement('h1');
      caption.textContent = 'Memory Game';
      caption.classList.add('menu__caption', 'text', 'text_fs_l');
      var text = document.createElement('p');
      text.textContent = 'Board size:';
      text.classList.add('menu__text', 'tex', 'text_fs_s', 'text_col_bright');
      var size = document.createElement('p');
      size.textContent = "".concat(this.currentRows, "x").concat(this.currentCols);
      size.classList.add('menu__text', 'text', 'text_fs_m');
      this.sizeNode = size;
      var changeSizeButton = document.createElement('button');
      changeSizeButton.textContent = 'Change';
      changeSizeButton.classList.add('menu__change-size-button', 'button', 'button_size_s', 'button_bright');
      changeSizeButton.addEventListener('click', function () {
        return _this.openBoardSettings();
      });
      var startGameButton = document.createElement('button');
      startGameButton.textContent = 'Start Game';
      startGameButton.classList.add('menu__start-game-button', 'button', 'button_size_l');
      startGameButton.addEventListener('click', function () {
        return _this.startGame();
      });
      this.root.append(caption, text, size, changeSizeButton, startGameButton);
      return this.root;
    }
  }]);

  return Menu;
}();