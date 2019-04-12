let MongoWrapper = require( '../DBWrapper/MongoWrapper');
let  assert = require( 'assert');

class Board {

  constructor(db) {
    this.mongoWrapper = new MongoWrapper(db);
  }

  async saveBoard(board) {
    await this.mongoWrapper.removeBoardData();
    await this.mongoWrapper.storeBoard(board);
  }

  async saveUserTurn(userTurnData) {
    await this.mongoWrapper.removeUserTurnData();
    await this.mongoWrapper.storeUserTurn(userTurnData);
  }

  async isUserHasTurn(userId) {
    assert(userId, 'userId is needed');
    let userTurn = await this.mongoWrapper.getUserTurnData();

    if (userTurn.value == userId) {
      return true;
    } else {
      return false;
    }

  }

  async getBoardAndTurn(userId) {
    assert(userId, 'userId is needed at getBoardAndTurn');

    try {
      let isTurn = await this.isUserHasTurn(userId);
      let board = await this.mongoWrapper.getBoard();

      return {
        board: board.value,
        isTurn
      };
    } catch (err) {
      // console.log(err);
      return {
        board: [[],[],[],[],[],[],[]],
        isTurn: true
      };
    }

  }

  async resetBoard() {
    await this.mongoWrapper.removeBoardData();
    await this.mongoWrapper.storeBoard({
      type: 'board',
      value: [[],[],[],[],[],[],[]]
    });
  }

  // checkWinning(matrix) {
  //
  //
  //   return 1;
  // }

}

module.exports = Board;
