
let Registration = require("./lib/Registration");
let Authentication = require('./lib/Authentication');

let Membership = function (db) {
  let registration = new Registration(db);
  let authentication = new Authentication(db);

  this.register = async function(args) {

    let result = await registration.applyMembership(args);
    return result;

  };

  this.authenticate = async function(creds) {
    let result = await authentication.authenticate(creds);
    return result;
  };

  return this;
};

module.exports = Membership;
