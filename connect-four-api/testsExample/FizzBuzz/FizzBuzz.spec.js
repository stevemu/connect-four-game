let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
require('jasmine-co').install();
let sinon = require('sinon');

let FizzBuzz = require('./FizzBuzz');


describe.only('FizzBuzz', function () {
  describe('perform', function () {

    it('show number if it is not divided by 3,5, 16 or both', function () {

      let fizzBuzz = new FizzBuzz();
      fizzBuzz.perform(1).should.equal(1);
      // fizzBuzz.perform(112).should.equal(112);

    });

    it('should show Fizz if divided by 3', () => {
      let fizzBuzz = new FizzBuzz();
      fizzBuzz.perform(3).should.equal("Fizz");
    });

    it('should show Buzz if divided by 5', () => {
      let fizzBuzz = new FizzBuzz();
      fizzBuzz.perform(5).should.equal("Buzz");
    });

    it('should show FizzBuzz if divided by both 3 and 5', () => {
      let fizzBuzz = new FizzBuzz();
      fizzBuzz.perform(15).should.equal("FizzBuzz");
    });


    it('should show ddd if divided by 16', () => {
      let fizzBuzz = new FizzBuzz();
      fizzBuzz.perform(16).should.equal("ddd");
      fizzBuzz.perform(32).should.equal("ddd");

    });


  });


});
