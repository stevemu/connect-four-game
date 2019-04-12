let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
require('jasmine-co').install();
let sinon = require('sinon');

let Calculator = require('./Calculator');
let Divider = require('./Divider');



describe('Calculator', function () {
  describe('divide', function () {

    it('should divide', function () {

      let result = Calculator.divide(2,2);
      result.should.equal(1);

    });

    it('should throw error when divide by 0', () => {
      let t = () => Calculator.divide(2,0);
      expect(t).to.throw("can't divide by 0");

    });

    it('should use divider', () => {

      // practicing sinon
      let divider = sinon.stub(new Divider());
      divider.divide.returns(100);
      let cal = new Calculator(divider);
      cal.divide(100,2).should.equal(100);

    });



  });
});
