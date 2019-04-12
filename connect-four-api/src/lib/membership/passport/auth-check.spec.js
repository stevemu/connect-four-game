let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');
let sinonChai = require('sinon-chai');
chai.use(chaiAsPromised);
chai.use(sinonChai);
require('jasmine-co').install();
let sinon = require('sinon');
let MockExpressResponse = require('mock-express-response');
let run = require('express-unit');

let authCheck = require('./auth-check');

describe('Auth Check', function () {

  // test('pass auth check if correct token is passed ', async (done) => {
  //   let req = {headers: {
  //     token: 'aaa'
  //   }};
  //   let nextSpy = sinon.spy();
  //   authCheck(req, {}, nextSpy);
  //   done();
  // });
  //
  // test('return 401 if incorrect token is passed ', async (done) => {
  //   let req = {headers: {
  //     token: 'bbb'
  //   }};
  //   let nextSpy = sinon.spy();
  //   let response = new MockExpressResponse();
  //   let spy = sinon.spy(response, "status");
  //   authCheck(req, response, nextSpy);
  //   sinon.assert.calledWith(spy, 401);
  //   done();
  // });

  test('pass auth', async (done) => {
    const setup = (req, res, next) => {
      req.headers.token = 'aaa';
      sinon.spy(res, 'status');
      next();
    };
    const [err, req, res] = await run(setup, authCheck);
    (res.status).should.not.have.been.called;
    done();

    // run(setup, authCheck, (err, req, res) => {
    //   (res.status).should.not.have.been.called;
    //   done();
    // });

  });


  test('not pass auth', async (done) => {
    const setup = (req, res, next) => {
      req.headers.token = 'bbb';
      sinon.spy(res, 'status');
      next();
    };
    const [err, req, res] = await run(setup, authCheck);
    (res.status).should.have.been.called;
    done();
  });


});
