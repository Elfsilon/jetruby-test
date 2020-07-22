"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Effect = /*#__PURE__*/function () {
  function Effect() {
    _classCallCheck(this, Effect);
  }

  _createClass(Effect, null, [{
    key: "fadeEffect",
    value: function fadeEffect(node) {
      node.classList.add('effect');
      setTimeout(function () {
        node.classList.add('effect_fade');
        setTimeout(function () {
          node.classList.remove('effect', 'effect_fade');
        }, 500);
      });
    }
  }, {
    key: "riseEffect",
    value: function riseEffect(node) {
      node.classList.add('effect', 'effect_rise');
      setTimeout(function () {
        node.classList.remove('effect_rise');
        setTimeout(function () {
          node.classList.remove('effect');
        }, 500);
      });
    }
  }]);

  return Effect;
}();