class MongoWrapper {

  constructor(db) {
    this.db = db;
  }

  async storeBoard(boardData) {
    await this.db.collection('data').insertOne(boardData);
    return true;
  }

  async storeUserTurn(userTurn) {
    await this.db.collection('data').insertOne(userTurn);
    return true;
  }

  async removeBoardData() {
    await this.db.collection('data').remove({type: 'board'});
    return true;
  }

  async removeUserTurnData() {
    await this.db.collection('data').remove({type: 'userTurn'});
    return true;
  }

  async getUserTurnData() {
    let result = await this.db.collection('data').findOne({type: 'userTurn'});
    return result;
  }

  async getBoard() {
    let result = await this.db.collection('data').findOne({type: 'board'});
    return result;
  }

}

module.exports = MongoWrapper;
