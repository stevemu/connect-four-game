let _ = require('lodash');

class Stack {

  constructor(stack = []) {
    this._stack = stack;
    this._index = this._stack.length - 1;
  }

  pop() {
    if (this._stack.length === 0) {
      return null;
    }
    let val = this._stack[this._index];
    this._stack = _.dropRight(this._stack);
    this._index -= 1;
    return val;
  }

  push(v) {
    this._stack = _.concat(this._stack, v);
    this._index += 1;
  }

}

module.exports = Stack;
