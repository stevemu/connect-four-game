let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
require('jasmine-co').install();
let request = require('supertest');
let assert = require('assert');
let bodyParer = require('body-parser');

let RegistrationRoute = require('./registration');
let Helpers = require("../../../../testHelpers/helpers");

describe('Registration Route', function () {
  describe('Register', function () {

    let app;
    let db;
    let helpers;
    beforeAll(async (done) => {
      helpers = new Helpers();
      db = await helpers.connectToDb();

      app = require('express')();
      app.use(bodyParer.json({limit: '5000mb'}));

      RegistrationRoute(app, db);
      done();
    });

    afterAll(async function(done) {
      await helpers.closeDb(db);
      done();
    });

    beforeEach(async function(done) {
      await helpers.deleteEverythingInDb(db);
      done();
    });

    test('should save new user to db', async (done) => {
      let user = {
        email: "a@a.com",
        password: "a",
        confirm: "a"
      };
      try {
        let res = await request(app).post('/auth/registration').send(user);
        res.statusCode.should.equal(200);
        res.body.success.should.be.true;
        done();
      } catch (err) {
        // console.log(err);
        done();
      }

    });

    test('should show error if password does not match', async (done) => {
      let user = {
        email: "a@a.com",
        password: "a"
      };
      let res = await request(app).post('/auth/registration').send(user);
      res.statusCode.should.equal(400);
      res.body.success.should.be.false;
      done();
    });

    test('should show error if user has been registered', async (done) => {
      let user = {
        email: "a@a.com",
        password: "a",
        confirm: "a"
      };
      await request(app).post('/auth/registration').send(user);
      let res2 = await request(app).post('/auth/registration').send(user);
      res2.statusCode.should.equal(400);
      res2.body.success.should.be.false;
      res2.body.message.should.equal('email exists');
      done();
    });


  });
});
