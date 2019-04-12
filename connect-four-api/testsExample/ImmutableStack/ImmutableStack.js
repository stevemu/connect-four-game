class ImmutableStack {

  constructor(item = null, previousStack = null) {
    this.item = item;
    this._previousStack = previousStack;
  }

  peek() {
    return this.item;
  }

  push(item) {
    let newStack = new ImmutableStack(item, this);
    return newStack;
  }

  pop() {
    if (this._previousStack) {
      return this._previousStack;
    }
    return new ImmutableStack();
  }

}

module.exports = ImmutableStack;
