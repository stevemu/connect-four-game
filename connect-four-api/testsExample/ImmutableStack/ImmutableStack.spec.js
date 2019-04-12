let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
require('jasmine-co').install();
let sinon = require('sinon');

let ImmutableStack = require('./ImmutableStack');

describe('ImmutableStack', function () {

  test('can create a new stack', () => {
    let stack = new ImmutableStack('a');
    stack.peek().should.equal('a');
  });

  test('can push an item to a stack', () => {
    let stack = new ImmutableStack('a');
    let newStack = stack.push('b');
    newStack.peek().should.equal('b');
  });

  test('can pop up an item from a stack', () => {
    let stack = new ImmutableStack('a');
    let returnStack = stack.pop();
    stack.peek().should.equal('a');
    should.not.exist(returnStack.peek());
  });

  test('should have default value', () => {
    let stack = new ImmutableStack();
    should.not.exist(stack.peek());
    should.not.exist(stack._previousStack);
  });


});
