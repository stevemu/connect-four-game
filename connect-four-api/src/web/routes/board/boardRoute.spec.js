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
let request = require('supertest');

let BoardRoute = require('./boardRoute');
let Helpers = require("../../../../testHelpers/helpers");

describe('Board Route', function () {

  let db;
  let helpers;
  let expressApp;

  beforeAll(async (done) => {
    helpers = new Helpers();
    db = await helpers.connectToDb();
    expressApp = helpers.getExpressApp();

    new BoardRoute(expressApp, db);

    done();
  });

  beforeEach(async (done) => {
    await helpers.deleteEverythingInDb(db);
    done();
  });

  test('can get current board and whether if it is his/her turn data', async (done) => {
    await helpers.insertSampleUserTurnAndBoardDataToDb(db);
    let result = await request(expressApp).get('/board/1');
    result.body.isTurn.should.be.true;
    done();
  });

  test('user can post board update', async (done) => {
    await helpers.insertSampleUserTurnAndBoardDataToDb(db);
    let res = await request(expressApp).post('/board-update/').send({
      userId: 2,
      board: [[2]]
    });
    let result = await db.collection('data').findOne({type: 'userTurn'});
    result.value.should.equal(1);
    res.body.success.should.be.true;
    done();
  });

  test('can reset board', async (done) => {
    await helpers.insertSampleUserTurnAndBoardDataToDb(db);
    await request(expressApp).post('/reset-board');
    let result = await db.collection('data').findOne({type: 'board'});
    result.value.should.deep.eql([[],[],[],[],[],[],[]]);
    done();
  });


});
