let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.use(require('chai-passport-strategy'));
require('jasmine-co').install();

let Helpers = require("../../../../testHelpers/helpers");

describe('local-login passport strategy', function () {
  describe('', function () {

    let strategy;

    beforeAll(async (done) => {
      strategy = require('./local-login-strategy');
      done();
    });

    test('strategy pass with correct username and password', async (done) => {

      chai.passport.use(strategy)
        .success((u) => {
          console.log(u);
          done();
        })
        .req((req) => {
          req.body = {};
          req.body.email = "a@a.com";
          req.body.password = "a";
        })
        .authenticate();

    });

    test.only('strategy not pass with incorrect username and password', async (done) => {

      chai.passport.use(strategy)
        .fail(() => {
          done();
        })
        .req((req) => {
          req.body = {};
          req.body.email = "b@b.com";
          req.body.password = "a";
        })
        .authenticate();

    });




  });


});
