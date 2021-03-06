"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Board = /*#__PURE__*/function () {
  function Board(cellsCount, columnsCount, boardWidth, incSolved, checkFinish) {
    _classCallCheck(this, Board);

    this.root = null;
    this.activeCell = null;
    this.checkFinish = checkFinish;
    this.incSolved = incSolved;
    this.boardWidth = boardWidth;
    this.cellBorderSize = 5;
    this.cellMargin = 5;
    this.cellsCount = cellsCount;
    this.columnsCount = columnsCount;
    this.rowsCount = cellsCount / columnsCount;
    this.colors = this.pickColors(Math.floor(this.cellsCount / 2 + 0.5));
    var cellAdditionalSpace = this.cellBorderSize + this.cellMargin + 0.5;
    this.cellSize = (boardWidth - columnsCount * cellAdditionalSpace) / columnsCount;
    return this.render();
  }

  _createClass(Board, [{
    key: "selectCell",
    value: function selectCell(target) {
      var _this = this;

      if (this.activeCell) {
        target.style.backgroundColor = this.colors[target.getAttribute('data-color-id')].hsl;
        target.parentNode.classList.add('board_blocked');
        setTimeout(function () {
          if (target.getAttribute('data-id') != _this.activeCell.getAttribute('data-id') && target.getAttribute('data-color-id') == _this.activeCell.getAttribute('data-color-id')) {
            target.classList.add('cell_disabled');

            _this.activeCell.classList.add('cell_disabled');

            _this.incSolved();
          } else {
            target.style.backgroundColor = 'white';
            _this.activeCell.style.backgroundColor = 'white';
          }

          _this.activeCell = null;
          target.parentNode.classList.remove('board_blocked');

          _this.checkFinish();
        }, 500);
      } else {
        this.activeCell = target;
        this.activeCell.style.backgroundColor = this.colors[target.getAttribute('data-color-id')].hsl;
      }
    }
  }, {
    key: "pickColors",
    value: function pickColors(count) {
      var colors = [];

      for (var i = 0; i < 32; i++) {
        var brightness = void 0;
        if (i < 8) brightness = 50;
        if (i >= 8 && i < 16) brightness = 36;
        if (i >= 16 && i < 24) brightness = 22;
        if (i >= 24 && i < 32) brightness = 8;
        colors.push({
          id: i,
          hsl: "hsl(".concat(45 * i, ", 90%, ").concat(brightness, "%)")
        });
      }

      return colors.slice(0, count);
    }
  }, {
    key: "createCells",
    value: function createCells() {
      var cellColors = this.colors.concat(this.colors);
      cellColors = shuffleArray(cellColors);
      var res = [];

      for (var i = 0; i < this.cellsCount; i++) {
        var cell = new Cell(this.cellSize);
        cell.classList.add('board__cell');
        if (this.columnsCount > 4 || this.rowsCount > 4) cell.classList.add('cell_border_s');
        cell.setAttribute('data-color-id', cellColors[i].id);
        cell.setAttribute('data-id', i);
        res.push(cell);
      }

      return res;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.root = document.createElement('div');
      this.root.classList.add('board');
      this.root.style.width = this.boardWidth + 'px';
      this.root.addEventListener('click', function (e) {
        if (!e.target.parentNode.classList.contains('board_blocked') && !e.target.classList.contains('cell_disabled') && e.target.classList.contains('cell')) {
          _this2.selectCell(e.target);
        }
      });

      var _iterator = _createForOfIteratorHelper(this.createCells()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var cell = _step.value;
          this.root.appendChild(cell);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return this.root;
    }
  }]);

  return Board;
}();