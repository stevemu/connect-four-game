let assert = require('assert');

let MongoWrapper = function (mongoDB) {

  this.saveUser = async function(user) {
    await mongoDB.collection('users').insertOne(user);
    return true;
  };

  this.findUser = async function(args) {
    assert(args.email, "email is required");
    try {
      let result = mongoDB.collection('users').findOne(args);
      return result;
    } catch (err) {
      return err;
    }
  };


  return this;
};

module.exports = MongoWrapper;
