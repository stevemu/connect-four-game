let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
require('jasmine-co').install();

let BankAccount = require('./BankAccount');

describe('Balance', function () {

  describe('add and remove', function () {

    it('should deposit', function () {

      let bankAccount = new BankAccount();
      bankAccount.deposit(20).should.equal(20);
      bankAccount.getBalance().should.equal(20);

    });

    it('should withdraw', () => {
      let bankAccount = new BankAccount({balance: 50});
      bankAccount.withdraw(20).should.equal(30);
      bankAccount.getBalance().should.equal(30);
    });

    it('should withdraw with penalty', () => {
      let bankAccount = new BankAccount({balance: 50});
      bankAccount.withdraw(60).should.equal(-15);
      bankAccount.getBalance().should.equal(-15);
    });

    it('should not withdraw', () => {
      let bankAccount = new BankAccount({balance: 50});
      bankAccount.withdraw(1000).should.be.false;
      bankAccount.getBalance().should.equal(50);
    });

  });
});
