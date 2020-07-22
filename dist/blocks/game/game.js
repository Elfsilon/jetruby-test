"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game = /*#__PURE__*/function () {
  function Game(_ref) {
    var width = _ref.width,
        height = _ref.height;

    _classCallCheck(this, Game);

    this.root = null;
    this.settings = {
      boardWidth: null,
      boardRows: 4,
      boardCols: 4,
      boardCellsCount: 16,
      gameWidth: width,
      gameHeight: height
    };
    this.state = {
      solved: 0,
      needToSolve: 8
    };
    this.setBoardSize = this.setBoardSize.bind(this);
    this.setBoardWidth = this.setBoardWidth.bind(this);
    this.openBoardSettings = this.openBoardSettings.bind(this);
    this.startGame = this.startGame.bind(this);
    this.incSolved = this.incSolved.bind(this);
    this.checkFinish = this.checkFinish.bind(this);
    this.modal = new Modal();
    this.boardSettingsWindow = null;
    return this.render();
  }

  _createClass(Game, [{
    key: "incSolved",
    value: function incSolved() {
      this.state.solved++;
    }
  }, {
    key: "checkFinish",
    value: function checkFinish() {
      if (this.state.solved == this.state.needToSolve) this.showFinalMessage();
    }
  }, {
    key: "refreshState",
    value: function refreshState() {
      this.state.solved = 0;
    }
  }, {
    key: "showFinalMessage",
    value: function showFinalMessage() {
      var _this = this;

      var wrapper = document.createElement('div');
      wrapper.classList.add('board__wrapper');
      var caption = document.createElement('h2');
      caption.classList.add('text', 'text_fs_m');
      caption.textContent = 'Perfect';
      var subtitle = document.createElement('p');
      subtitle.classList.add('text', 'text_fs_s');
      subtitle.textContent = 'You are awesome!';
      this.boardNode.innerHTML = '';
      wrapper.append(caption, subtitle);
      this.boardNode.append(wrapper);
      setTimeout(function () {
        Effect.riseEffect(_this.boardNode);
      }, 1000);
    }
  }, {
    key: "setBoardSize",
    value: function setBoardSize(rows, cols) {
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

  }, {
    key: "setBoardWidth",
    value: function setBoardWidth(minBoardFactor, maxBoardFactor) {
      var minWH = Math.min(this.settings.gameWidth, this.settings.gameHeight);
      var step = (maxBoardFactor - minBoardFactor) / 7;
      var colsFactor = this.settings.boardCols - 2;
      var rowsFactor = 9 - this.settings.boardRows;
      var factor = Math.min(minBoardFactor + step * (colsFactor + rowsFactor * 0.5), maxBoardFactor);
      this.settings.boardWidth = minWH * factor;
    }
  }, {
    key: "openBoardSettings",
    value: function openBoardSettings() {
      this.boardSettingsWindow = new BoardSettingsWindow(this.settings.boardRows, this.settings.boardCols, this.setBoardSize, this.modal.close);
      this.modal.open(this.boardSettingsWindow);
    }
  }, {
    key: "openMenu",
    value: function openMenu() {
      this.menu = new Menu(this.openBoardSettings, this.startGame, this.settings.boardRows, this.settings.boardCols);
      this.root.innerHTML = '';
      this.root.append(this.menu);
      Effect.riseEffect(this.menu);
    }
  }, {
    key: "startGame",
    value: function startGame() {
      var _this2 = this;

      Effect.fadeEffect(this.menu);
      this.refreshState();
      this.setBoardWidth(0.15, 0.6);
      this.root.innerHTML = '';
      var board = new Board(this.settings.boardCellsCount, this.settings.boardCols, this.settings.boardWidth, this.incSolved, this.checkFinish);
      board.classList.add('game__board');
      this.boardNode = board;
      var wrapper = document.createElement('div');
      wrapper.classList.add('game__wrapper');
      var backToMenuButton = document.createElement('button');
      backToMenuButton.classList.add('game__button-back', 'button', 'button_size_m', 'button_bright');
      backToMenuButton.textContent = 'Menu';
      backToMenuButton.addEventListener('click', function () {
        return _this2.openMenu();
      });
      var restartButton = document.createElement('button');
      restartButton.classList.add('button', 'button_size_m', 'button_bright');
      restartButton.textContent = 'Restart';
      restartButton.addEventListener('click', function () {
        return _this2.startGame();
      });
      wrapper.append(backToMenuButton, restartButton);
      this.root.append(board, wrapper);
      Effect.riseEffect(this.boardNode);
    }
  }, {
    key: "render",
    value: function render() {
      this.root = document.createElement('div');
      this.root.classList.add('game');
      this.root.style.width = this.settings.gameWidth + 'px';
      this.root.style.height = this.settings.gameHeight + 'px';
      this.openMenu();
      return this.root;
    }
  }]);

  return Game;
}();