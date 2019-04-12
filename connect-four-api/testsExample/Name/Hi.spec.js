let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
require('jasmine-co').install();
let sinon = require('sinon');

let Hi = require("./Hi");

describe('Hi', function () {

  test('can say hi and name', () => {
    let nameService = {};
    nameService.getName = sinon.stub().returns('steve');
    let hi = new Hi(nameService);
    hi.speak().should.equal('hi, steve');
  });


  test('can say hi async', async (done) => {
    let nameService = {};
    nameService.getNameAsync = sinon.stub().resolves('qi');
    let hi = new Hi(nameService);
    let speakResult = await hi.speakAsync();
    speakResult.should.equal('hi, qi');
    // nameService.getNameAsync.calledOnce().should.be.true;
    // console.log(nameService.getNameAsync.calledOnce.should.be.true);
    done();
  });

});
