let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
require('jasmine-co').install();
let sinon = require("sinon");

let Divider = require("./Divider");

describe('Divider', function () {
    describe('divide', function () {
        it('should divide', function () {
          let divider = new Divider();
          divider.divide(1,1).should.equal(1);
        });
    });


    describe('mock test', function () {
      let user = {
        say: () => {
          return "hello";
        }
      };
      sinon.spy(user, 'say');
      user.say();

      // console.log(user.say.calledOnce);

    });

});
