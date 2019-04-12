let assert = require("assert");

let User = function (args) {
  assert.ok(args.email, "Email is required");
  let user = {};

  if (args.id) {
    user.id = args.id;
  }

  user.email = args.email;
  user.signInCount = args.signInCount || 0;
  user.password = args.password || null;

  return user;
};

module.exports = User;
