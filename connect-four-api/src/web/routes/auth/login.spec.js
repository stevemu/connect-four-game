let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
require('jasmine-co').install();
let bodyParer = require('body-parser');
let request = require('supertest');


let LoginRoute = require('./login');
let Helpers = require("../../../../testHelpers/helpers");

describe('Authentication', function () {
  describe('login', function () {
    // more specs

    let app;
    let db;
    let helpers;

    beforeAll(async function(done) {

      helpers = new Helpers();
      db = await helpers.connectToDb();
      app = helpers.getExpressApp();

      LoginRoute(app, db);

      await db.collection('users').insertOne({
        email: "a@a.com",
        password: 'a'
      });

      done();

    });

    afterAll(async function(done) {
      await helpers.deleteEverythingInDb(db);
      done();
    });


    test('can login ', async (done) => {

      let loginInfo = {
        email: "a@a.com",
        password: "a"
      };

      let result = await request(app).post('/auth/login').send(loginInfo);
      result.body.success.should.be.true;
      done();
    });


    test('have login token when login', async (done) => {
      let loginInfo = {
        email: "a@a.com",
        password: "a"
      };

      let result = await request(app).post('/auth/login').send(loginInfo);
      result.body.token.should.exist;
      done();

    });


  });
});
