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

let Board = require('./board');
let Helpers = require('../../../../testHelpers/helpers');

describe('Board', function () {

  let board;
  let db;
  let helpers;
  beforeAll(async (done) => {
    helpers = new Helpers();
    db = await helpers.connectToDb();
    board = new Board(db);
    done();
  });

  beforeEach(async (done) => {
    await db.collection('data').remove({});
    done();
  });

  test('can overwrite existing board data', async (done) => {
    await db.collection('data').insertOne({type: 'board', value: [[1]]});

    let boardData = {
      type: 'board',
      value: [
        [1,2],
        [],
        [],
        [],
        [],
        [],
        []
      ]
    };
    await board.saveBoard(boardData);

    let result = await db.collection('data').findOne({type: 'board'});
    result.value.should.deep.eql(boardData.value);

    done();

  });


  test('can overwrite existing userTurn data', async (done) => {
    await db.collection('data').insertOne({type: 'userTurn', value: 1});
    let userTurnData = {
      type: 'userTurn',
      value: 2
    };
    await board.saveUserTurn(userTurnData);

    let result = await db.collection('data').findOne({type: 'userTurn'});
    result.value.should.equal(userTurnData.value);

    done();
  });

  test('can check whether a user has the turn at a given time', async (done) => {
    await db.collection('data').insertOne({type: 'userTurn', value: 1});
    (await board.isUserHasTurn(1)).should.be.true;
    (await board.isUserHasTurn(2)).should.be.false;
    done();
  });

  test.skip('given a user id, return board and if this is his/her turn', async (done) => {
    let userTurnData = {type: 'userTurn', value: 1};
    let boardData = {type: 'board', value: [[1]]};
    await db.collection('data').insertOne(userTurnData);
    await db.collection('data').insertOne(boardData);
    let result = await board.getBoardAndTurn(1);
    result.board.should.deep.eql(boardData.value);
    result.isTurn.should.be.true;

    done();

  });

  test('can reset board', async (done) => {
      await helpers.insertSampleUserTurnAndBoardDataToDb(db);
      await board.resetBoard();
      let boardResult = await db.collection('data').findOne({type: 'board'});
      boardResult.value.should.deep.eql([[],[],[],[],[],[],[]]);
      done();
  });

  test('return init data when there is no data in db when getting board and turn', async (done) => {
    let result = await board.getBoardAndTurn(1);
    result.isTurn.should.be.true;
    result.board.should.deep.eql([[],[],[],[],[],[],[]]);
    done();
  });

  // test('can check the winning', () => {
  //
  //   let matrix = [
  //     [1,1,1,1]
  //   ];
  //   board.checkWinning(matrix).should.equal(1);
  //
  // });

});
