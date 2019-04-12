let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
require('jasmine-co').install();
let sinon = require('sinon');

let Stack = require('./Stack');

let _ = require('lodash');

describe('Stack', function () {
  describe('', function () {

    test('it pops with default arr', function () {
      let stack = new Stack([1]);
      stack.pop().should.equal(1);

      stack = new Stack([2]);
      stack.pop().should.equal(2);
    });

    test('should return false when pop on a empty stack', () => {
      let stack = new Stack();
      should.not.exist(stack.pop());
      // stack.pop().should.equal(false);
    });

    test('should pop up until null', () => {
      let stack = new Stack([1]);
      let a = stack.pop();
      // should.be.null(stack.pop());
      should.not.exist(stack.pop());
      // stack.pop().should.be.false;
    });

    test('can push to stack', () => {
      let stack = new Stack();
      stack.push(2);
      stack.pop().should.equal(2);
    });

    // test('should test lodash', () => {
    //   let arr = [1];
    //   let af
    // });
    //

  });



});
