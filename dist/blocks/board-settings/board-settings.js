"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BoardSettingsWindow = /*#__PURE__*/function () {
  function BoardSettingsWindow(boardRows, boardCols, setBoardSize, closeModal) {
    _classCallCheck(this, BoardSettingsWindow);

    this.root = null;
    this.cells = null;
    this.selectedCell = null;
    this.boardRows = boardRows;
    this.boardCols = boardCols;
    this.setBoardSize = setBoardSize;
    this.closeModal = closeModal;
    return this.render();
  }

  _createClass(BoardSettingsWindow, [{
    key: "highlightRect",
    value: function highlightRect(curRow, curCol) {
      var highlightColor = curRow >= 1 && curCol >= 1 ? 'board-settings__cell_highlight' : 'board-settings__cell_highlight_wrong';

      for (var i = 0; i < this.cells.length; i++) {
        if (this.cells[i].classList.contains('board-settings__cell_highlight')) {
          this.cells[i].classList.remove('board-settings__cell_highlight');
        }

        if (this.cells[i].classList.contains('board-settings__cell_highlight_wrong')) {
          this.cells[i].classList.remove('board-settings__cell_highlight_wrong');
        }

        if (this.cells[i].getAttribute('data-row') <= curRow && this.cells[i].getAttribute('data-col') <= curCol) {
          this.cells[i].classList.add(highlightColor);
        }
      }
    }
  }, {
    key: "highlightPreviousRect",
    value: function highlightPreviousRect() {
      this.highlightRect(this.selectedCell.getAttribute('data-row'), this.selectedCell.getAttribute('data-col'));
    }
  }, {
    key: "selectSize",
    value: function selectSize(target, i, j) {
      if (i >= 1 && j >= 1) {
        this.selectedCell = target;
        this.boardRows = +target.getAttribute('data-row') + 1;
        this.boardCols = +target.getAttribute('data-col') + 1;
        this.sizeNode.textContent = "".concat(this.boardRows, "x").concat(this.boardCols);
      }
    }
  }, {
    key: "apply",
    value: function apply() {
      this.setBoardSize(this.boardRows, this.boardCols);
      this.closeModal();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      this.root = document.createElement('div');
      this.root.classList.add('board-settings');
      var board = document.createElement('div');
      board.classList.add('board-settings__board', 'board');
      board.addEventListener('mousemove', function (e) {
        if (e.target.classList.contains('board-settings__cell')) _this.highlightRect(e.target.getAttribute('data-row'), e.target.getAttribute('data-col'));
      });
      board.addEventListener('mouseleave', function () {
        return _this.highlightPreviousRect();
      });
      board.addEventListener('click', function (e) {
        if (e.target.classList.contains('board-settings__cell')) _this.selectSize(e.target, e.target.getAttribute('data-row'), e.target.getAttribute('data-col'));
      });

      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          var cell = document.createElement('div');
          cell.classList.add('board-settings__cell', 'cell');
          cell.setAttribute('data-row', i);
          cell.setAttribute('data-col', j);
          if (i < 4 && j < 4) cell.classList.add('board-settings__cell_highlight');
          if (window.innerWidth <= 600 && (i > 5 || j > 5)) cell.classList.add('board-settings__cell_disabled');
          if (i == 3 && j == 3) this.selectedCell = cell;
          board.append(cell);
        }
      }

      this.cells = board.childNodes;
      var info = document.createElement('div');
      info.classList.add('board-settings__info');
      var caption = document.createElement('h3');
      caption.classList.add('board-settings__caption', 'text', 'text_fs_xs');
      caption.textContent = 'Board size:';
      var size = document.createElement('p');
      size.classList.add('board-settings__size', 'text', 'text_fs_xs');
      size.textContent = "".concat(this.boardRows, "x").concat(this.boardCols);
      this.sizeNode = size;
      var applyButton = document.createElement('button');
      applyButton.classList.add('button', 'button_size_s');
      applyButton.textContent = 'Apply';
      applyButton.addEventListener('click', function () {
        return _this.apply();
      });
      info.append(caption, size, applyButton);
      this.root.append(board, info);
      return this.root;
    }
  }]);

  return BoardSettingsWindow;
}();