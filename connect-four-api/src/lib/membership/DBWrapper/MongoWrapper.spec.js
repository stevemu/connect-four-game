let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
require('jasmine-co').install();

let MongoWrapper = require('./index');
let MongoClient = require('mongodb').MongoClient;

let User = require('../models/User');

describe('Mongo Wrapper', function () {
  describe('User', function () {

    let mongoWrapper;
    let mongoDb;

    beforeAll(async function (done) {
      mongoDb = await MongoClient.connect('mongodb://localhost:27017/test1');
      await mongoDb.collection('users').remove({});
      mongoWrapper = new MongoWrapper(mongoDb);
      let user = new User({
        email: "a@a.com",
        password: "a"
      });
      await mongoWrapper.saveUser(user);
      done();
    });


    afterAll(async function(done) {
      await mongoDb.close();
      done();
    });

    it('should save user to DBWrapper', async function(done) {
      let result = await mongoDb.collection('users').findOne({email: 'a@a.com'});
      result.email.should.equal('a@a.com');
      done();
    });

    it('should find user with email in DBWrapper', async function (done) {
      let result = await mongoWrapper.findUser({
        email: "a@a.com"
      });
      result.email.should.equal('a@a.com');
      done();
    });

    it('should throw an error if email is not present when finding a user', async function (done) {
      try {
        let result = await mongoWrapper.findUser({});
      } catch (err) {
        done();
      }

    });

    it('should return null if user is not present in DBWrapper', async function (done) {
      let result = await mongoWrapper.findUser(({email: "b@b.com"}));
      expect(result).to.be.null;
      done();
    });

  });
});
