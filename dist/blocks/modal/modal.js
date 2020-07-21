"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Modal = /*#__PURE__*/function () {
  function Modal() {
    _classCallCheck(this, Modal);

    this.root = null;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.render();
  }

  _createClass(Modal, [{
    key: "open",
    value: function open(component) {
      if (this.root.innerHTML) this.close();
      this.root.append(component);
      this.root.classList.remove('modal_hidden');
    }
  }, {
    key: "close",
    value: function close() {
      this.root.innerHTML = '';
      this.root.classList.add('modal_hidden');
    }
  }, {
    key: "render",
    value: function render() {
      this.root = document.createElement('div');
      this.root.classList.add('modal', 'modal_hidden');
      document.body.append(this.root);
    }
  }]);

  return Modal;
}();