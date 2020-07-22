"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (elem) {
  // Check if element is a node
  // https://github.com/Financial-Times/polyfill-service
  var isNode = function isNode(object) {
    // DOM, Level2
    if (typeof Node === 'function') {
      return object instanceof Node;
    } // Older browsers, check if it looks like a Node instance)


    return object && _typeof(object) === 'object' && object.nodeName && object.nodeType >= 1 && object.nodeType <= 12;
  }; // Add append() method to prototype


  for (var i = 0; i < elem.length; i++) {
    if (!window[elem[i]] || 'append' in window[elem[i]].prototype) continue;

    window[elem[i]].prototype.append = function () {
      var argArr = Array.prototype.slice.call(arguments);
      var docFrag = document.createDocumentFragment();

      for (var n = 0; n < argArr.length; n++) {
        docFrag.appendChild(isNode(argArr[n]) ? argArr[n] : document.createTextNode(String(argArr[n])));
      }

      this.appendChild(docFrag);
    };
  }
})(['Element', 'CharacterData', 'DocumentType']);