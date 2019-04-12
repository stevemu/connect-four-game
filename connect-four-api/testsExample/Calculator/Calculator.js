class Calculator {

  constructor(divider) {
    this.divider = divider;
  }

  divide(a,b) {
    return this.divider.divide(a,b);
  }

  static divide(a,b) {
    if (b === 0) {
      throw "can't divide by 0";
    }
    return a/b;
  }
}

module.exports = Calculator;
