let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
require('jasmine-co').install();

// let MongoClient = require('mongodb').MongoClient;
let Registration = require('./Registration');
let Helpers = require('../../../../testHelpers/helpers');

describe('Registration', function () {

  let db;
  let registration;
  beforeAll(async function (done) {
    let helpers = new Helpers();
    db = await helpers.connectToDb();
    registration = new Registration(db);
    done();

  });

  afterAll(async function (done) {
    await db.close();
    done();
  });


  describe('a valid application', function () {
    let regResult;
    beforeAll(async function (done) {
      await db.collection('users').remove({});
      regResult = await registration.applyMembership({
        email: "a@b.com",
        password: "a",
        confirm: "a"
      });
      done();

    });

    it('returns a success message', function () {
      regResult.success.should.be.true;
    });

    it('should saves user to DBWrapper', async function (done) {
      await expect(db.collection('users').findOne({email: "a@b.com"})).to.eventually.have.property('email');
      done();
    });
  });

  describe('no email', function () {
    let regResult;
    beforeAll(async function (done) {
      await db.collection('users').remove({});
      regResult = await registration.applyMembership({
        email: null,
        password: "a",
        confirm: "a"
      });
      done();
    });

    it('should not successful', function () {
      regResult.success.should.be.false;
    });

    it('should have the message', function () {
      regResult.message.should.equal('no email or password');
    });

  });

  describe('email exists', function () {
    let regResult;

    beforeAll(async function (done) {
      await db.collection('users').remove({});
      await registration.applyMembership({
        email: "a@a.com",
        password: "a",
        confirm: "a"
      });
      regResult = await registration.applyMembership({
        email: "a@a.com",
        password: "a",
        confirm: "a"
      });
      done();

    });

    it('should not be successful', function () {
      regResult.success.should.be.false;
    });

    it('should have message', function () {
      regResult.message.should.equal("email exists");
    });

  });


  describe('password does not match', function () {
    let regResult;
    beforeAll(async function (done) {
      await db.collection('users').remove({});
      regResult = await registration.applyMembership({
        email: "a@a.com",
        password: "a",
        confirm: "b"
      });
      done();
    });

    it('should not be successful', function () {
      regResult.success.should.be.false;
    });

    it('should have error message', function () {
      regResult.message.should.equal("password does not match");
    });


  });


});
