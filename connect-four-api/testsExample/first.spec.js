'use strict';

const chai = require('chai'),
  expect = chai.expect;

chai.should();

function isEven(num) {
  return num % 2 === 0;
}


function add(num1, num2) {
  return num1 + num2;
}

describe('numbers', function () {

  describe('isEven', function () {
    it('should return ture when the number is even', function () {
      isEven(2).should.be.true;
    });

    it('shold return false when the number is odd', function () {
      isEven(3).should.be.false;
    });
  });



  describe('add', function () {
    let testNum = 10;

    beforeEach(function () {
      testNum = 20;
    });

    afterEach(function () {
      // console.log('after each');
    });

    it('should add two numbers', function () {
      const num = add(1,2);
      num.should.be.equal(3);
    });

    it('should add 20 to 20 and equal 40', function () {
      const result = add(testNum, 20);
      result.should.be.equal(40);
    });


  });

});
