let chai = require('chai');
let should = chai.should();
let exepct = chai.expect;
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

let Registration = require('./Registration');
let Authentication = require('./Authentication');
let Helpers = require('../../../../testHelpers/helpers');

describe('Authentication', function () {

  let db;
  let registration;
  let authentication;

  beforeAll(async function (done) {
    let helpers = new Helpers();
    db = await helpers.connectToDb();
    registration = new Registration(db);
    authentication = new Authentication(db);
    done();
    // MongoClient.connect('mongodb://localhost:27017/test1')
    //   .then((mdb) => {
    //     db = mdb;
    //     registration = new Registration(db);
    //     authentication = new Authentication(db);
    //     done();
    //   })
    //   .catch((err) => {
    //
    //   });
  });


  afterAll(async function (done) {
    await db.close();
    done();
  });


  describe('a valid login', function () {

    let authResult;

    beforeAll(async function (done) {
      await db.collection('users').remove({});
      // yield DBWrapper.collection('users').insertOne({name: 'qi3'});
      await registration.applyMembership({
        email: "a@b.com",
        password: "a",
        confirm: "a"
      });
      authResult = await authentication.authenticate({
        email: "a@b.com",
        password: "a"
      });
      done();
    });


    // more specs
    it('should return success', function () {
      authResult.success.should.be.true;
    });

  });


  describe('emtpy credentials', function () {
    let authResult;

    beforeAll(async function (done) {
      await db.collection('users').remove({});
      await registration.applyMembership({
        email: "a@b.com",
        password: "a",
        confirm: "a"
      });
      authResult = await authentication.authenticate({
        email: '',
        password: ''
      });
      done();
    });


    // more specs
    it('should return false', function () {
      authResult.success.should.be.false;
      authResult.message.should.equal("email or password is empty");
    });

  });


  describe('wrong password', function () {
    let authResult;

    beforeAll(async function (done) {
      await db.collection('users').remove({});
      // yield DBWrapper.collection('users').insertOne({name: 'qi3'});
      await registration.applyMembership({
        email: "a@b.com",
        password: "a",
        confirm: "a"
      });
      authResult = await authentication.authenticate({
        email: 'a@b.com',
        password: 'bbb'
      });
      done();
    });

    // more specs
    it('should return false', function () {
      authResult.success.should.be.false;
    });

    it('should have correct error message', function () {
      authResult.message.should.equal("wrong password");
    });

  });


  describe('email not found', function () {
    let authResult;

    beforeAll(async function (done) {
      await db.collection('users').remove({});
      authResult = await authentication.authenticate({
        email: 'b@b.com',
        password: 'bbb'
      });
      done();
    });


    it('should return false', function () {
      authResult.success.should.be.false;
    });

    it('should return correct error message', function () {
      authResult.message.should.equal("email not found");
    });


  });





});
