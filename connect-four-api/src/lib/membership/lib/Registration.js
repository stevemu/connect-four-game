let Application = require('../models/Application');
let User = require('../models/User');
let DBWrapper = require('../DBWrapper/index');

let Registration = function (db) {
  let dbWrapper = new DBWrapper(db);

  this.applyMembership = async function (args) {

    let app = Application(args);
    let result;

    try {
      app = await validateInputs(app);
      app = await checkUserExists(app);
      app = await createUser(app);
      result = {success: true};

    } catch (err) {
      result = {success: false};
      result.message = app.message;
    }

    return result;

  };

  let validateInputs = (app) => {
    return new Promise((resolve, reject) => {

      if (!app.email || !app.password) {
        app.setInvalid('no email or password');
        reject(app);
      } else if (app.password !== app.confirm) {
        app.setInvalid("password does not match");
        reject(app);
      }
      else {
        app.setValid();
        resolve(app);
      }

    });
  };

  let checkUserExists = async function (app) {
    let result = await dbWrapper.findUser({email: app.email});
    if (result) {
      app.setInvalid("email exists");
      throw app;
    } else {
      return app;
    }

  };

  let createUser = async function (app) {
    let user = new User(app);
    user.status = 'approved';
    // await db.collection('users').insertOne(user);
    await dbWrapper.saveUser(user);
    return app;
  };


  return this;
};


module.exports = Registration;
