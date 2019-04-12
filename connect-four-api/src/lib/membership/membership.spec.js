let chai = require('chai');
let should = chai.should();
// let exepct = chai.expect;
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let MongoClient = require('mongodb').MongoClient;

/* eslint-disable no-console */

let Membership = require('./index');

describe('membership', function () {
    describe('index', function () {
      it('should export', function () {
        let index = require('./index');
        should.exist(index);
      });
    });

    describe('registration', function () {
      let db;
      let membership;
      let registerResult;
      beforeAll(async function(done) {
        db = await MongoClient.connect('mongodb://localhost:27017/test1');
        await db.collection('users').remove({});
        membership = new Membership(db);
        registerResult = await membership.register({email: "a@a.com", password: "a", confirm: "a"});
        done();
      });

      afterAll(async function (done) {
        await db.close();
        done();
      });

      it('should return success', function () {
        registerResult.success.should.be.true;
      });

      it('should create records in the DBWrapper', async function (done) {
        let result = await db.collection('users').findOne({email: 'a@a.com'});
        should.exist(result);
        done();
      });

    });

    describe('Login', function () {
      let db;
      let membership;
      beforeAll(async function(done) {
        db = await MongoClient.connect('mongodb://localhost:27017/test1');
        await db.collection('users').remove({});
        membership = new Membership(db);
        await membership.register({email: "a@a.com", password: "a", confirm: "a"});
        done();
      });

      afterAll(async function (done) {
        await db.close();
        done();
      });

      it('should authenticate successfully', async function (done) {
        let result = await membership.authenticate({email:'a@a.com', password:'a'});
        result.success.should.be.true;
        done();

      });


    });
});
