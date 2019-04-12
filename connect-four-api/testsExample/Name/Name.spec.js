let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
require('jasmine-co').install();
let sinon = require('sinon');

let Name = require("./Name");

describe('Name', function () {
  describe('', function () {
    test('return name', function () {
      let name = new Name();
      name.getName().should.equal('steve');
    });

    test('return name async', async (done) => {
      let name = new Name();
      let result = await name.getNameAsync();
      result.should.equal('steve');
      done();
    });
  });



});
