let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

let User = require('./User');
describe('User', function () {
    describe('defaults', function () {

        // more specs
      let user;
      beforeAll(function () {
        user = new User({email: "a@a.com"});
      });

      it('should have an email', function () {
        user.email.should.equal('a@a.com');
      });

      it('should have a null password', function () {
        expect(user.password).to.be.null;
      });

    });
});
