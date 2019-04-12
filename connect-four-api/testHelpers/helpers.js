let bodyParer = require('body-parser');
import assert from 'assert';
// import mongodb from 'mongo-mock';
// let MongoClient = mongodb.MongoClient;
let MongoClient = require('mongodb').MongoClient;

class Helpers {

  async connectToDb() {
    let db = await MongoClient.connect('mongodb://localhost:27017/test1');
    // await this.deleteEverythingInDb(db);
    return db;
  }

  async deleteEverythingInDb(db) {
    assert(db, 'db is required');
    await db.collection('data').remove({});
  }

  async closeDb(db) {
    await this.deleteEverythingInDb(db);
    await db.close();
  }

  getExpressApp() {
    let app = require('express')();
    app.use(bodyParer.json({limit: '5000mb'}));
    return app;
  }

  getSampleUserTurnData() {
    return {type: 'userTurn', value: 1};
  }

  getSampleBoardData() {
    return {type: 'board', value: [[1]]};
  }

  async insertSampleUserTurnAndBoardDataToDb(db) {
    await db.collection('data').insertOne(this.getSampleUserTurnData());
    await db.collection('data').insertOne(this.getSampleBoardData());
    return true;
  }
}

module.exports = Helpers;
