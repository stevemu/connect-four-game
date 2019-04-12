
class BankAccount {

  constructor(args = {}) {
    this._balance = args.balance || 0;
  }

  deposit(amount) {
    this._balance += amount;
    return this._balance;
  }

  withdraw(amount) {

    if (this._balance - amount < -100) {
      return false;
    }

    this._balance -= amount;
    if (this._balance < 0) {
      this._balance -= 5;
    }
    return this._balance;

  }

  getBalance() {
    return this._balance;
  }

}

module.exports = BankAccount;
