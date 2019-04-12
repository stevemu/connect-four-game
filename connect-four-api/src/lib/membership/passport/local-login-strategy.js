const PassportLocalStrategy = require('passport-local').Strategy;

let strategy = new PassportLocalStrategy({
  usernameField: "email",
  passwordField: "password",
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  if (email === "a@a.com" && password === "a") {
    return done(null, {id: '1234'});
  }

  return done(null, false);

});

module.exports = strategy;
