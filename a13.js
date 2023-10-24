"use strict";

var nodes = [].slice.call(document.querySelectorAll('li'), 0);
var directions = {
  0: 'top',
  1: 'right',
  2: 'bottom',
  3: 'left'
};
var classNames = ['in', 'out'].map(function (p) {
  return Object.values(directions).map(function (d) {
    return "".concat(p, "-").concat(d);
  });
}).reduce(function (a, b) {
  return a.concat(b);
});

var getDirectionKey = function getDirectionKey(ev, node) {
  var _node$getBoundingClientRect = node.getBoundingClientRect(),
      width = _node$getBoundingClientRect.width,
      height = _node$getBoundingClientRect.height,
      top = _node$getBoundingClientRect.top,
      left = _node$getBoundingClientRect.left;

  var l = ev.pageX - (left + window.pageXOffset);
  var t = ev.pageY - (top + window.pageYOffset);
  var x = (l - width / 2) * (width > height ? height / width : 1);
  var y = (t - height / 2) * (height > width ? width / height : 1);
  return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
};

var Item = /*#__PURE__*/function () {
  function Item(element) {
    var _this = this;

    this.element = element;
    this.element.addEventListener('mouseover', function (ev) {
      return _this.update(ev, 'in');
    });
    this.element.addEventListener('mouseout', function (ev) {
      return _this.update(ev, 'out');
    });
  }

  var _proto = Item.prototype;

  _proto.update = function update(ev, prefix) {
    this.element.classList.remove.apply(this.element.classList, classNames);
    this.element.classList.add("".concat(prefix, "-").concat(directions[getDirectionKey(ev, this.element)]));
  };

  return Item;
}();

nodes.forEach(function (node) {
  return new Item(node);
});
