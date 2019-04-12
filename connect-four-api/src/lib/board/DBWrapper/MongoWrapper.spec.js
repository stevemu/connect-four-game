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

import MongoWrapper from './MongoWrapper';
let Helpers = require('../../../../testHelpers/helpers');

describe('MongoWrapper', function () {

  let helpers = new Helpers();
  let db;
  let mongoWrapper;

  beforeAll(async (done) => {
    db = await helpers.connectToDb();
    mongoWrapper = new MongoWrapper(db);

    done();
  });

  beforeEach(async (done) => {
    await db.collection('data').remove({});
    done();
  });

  test('can store board', async (done) => {

    let sampleBoard = [
      [1,2],
      [],
      [],
      [],
      [],
      [],
      []
    ];

    let boardData = {
      type: 'board',
      value: sampleBoard
    };
    await mongoWrapper.storeBoard(boardData);

    let boardTest = await db.collection('data').findOne({type: 'board'});
    boardTest.value.should.deep.eql(sampleBoard);

    done();
  });


  test('can store user turns', async (done) => {
    let userTurn = {
      type: 'userTurn',
      currentTurn: 1
    };

    await mongoWrapper.storeUserTurn(userTurn);

    let userTurnTest = await db.collection('data').findOne({type: 'userTurn'});
    userTurnTest.currentTurn.should.equal(1);
    done();
  });


  test('can remove existing board data', async (done) => {

    await db.collection('data').insertOne({
      type: 'board',
      value: []
    });
    await mongoWrapper.removeBoardData();

    let result = await db.collection('data').findOne({type: 'board'});
    should.not.exist(result);

    done();
  });

  test('can remove existing user turn data', async (done) => {

    await db.collection('data').insertOne({
      type: 'userTurn',
      currentTurn: 1
    });
    await mongoWrapper.removeUserTurnData();

    let result = await db.collection('data').findOne({type: 'userTurn'});
    should.not.exist(result);

    done();
  });

  test('can get userTurn data', async (done) => {
    await db.collection('data').insertOne({
      type: 'userTurn',
      currentTurn: 1
    });
    let result = await mongoWrapper.getUserTurnData();
    result.currentTurn.should.equal(1);
    done();
  });

  test('can get board', async (done) => {
    await db.collection('data').insertOne({
      type: 'board',
      value: [[1]]
    });
    let result = await mongoWrapper.getBoard();
    result.value.should.deep.eql([[1]]);
    done();
  });


});
