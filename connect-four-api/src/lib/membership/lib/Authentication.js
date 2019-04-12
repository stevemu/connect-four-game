let User = require('../models/User');
let DBWrapper = require('../DBWrapper/index');

let Authentication = function (db) {
  let dbWrapper = new DBWrapper(db);

  let validateCredentials = (creds) => {
    if (creds.email && creds.password) {
      return true;
    } else {
      throw "email or password is empty";
    }
  };

  let findUser = async function (creds) {
    // let result = await db.collection('users').findOne({email: creds.email});
    let result = await dbWrapper.findUser({email: creds.email});
    if (result) {
      let user = new User(result);
      return user;
    } else {
      throw "email not found";
    }
  };

  let comparePassword = async function (user, password) {
    if (user.password === password) {
      return true;
    } else {
      throw "wrong password";
    }
  };


  this.authenticate = async function (creds) {
    let authResult;

    try {
      validateCredentials(creds);
      let user = await findUser(creds);
      await comparePassword(user, creds.password);

      authResult = {
        success: true
      };
    } catch (err) {
      authResult = {
        success: false,
        message: err
      };
    }

    return authResult;
  };



  return this;
};

module.exports = Authentication;
