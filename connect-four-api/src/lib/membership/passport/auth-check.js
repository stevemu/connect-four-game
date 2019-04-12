// let wrap = require('express-async-wrap');
import wrap from 'express-async-wrap';

// let authCheck = (req, res, next) => {
//
//   if (req.headers.token === "aaa") {
//     return next();
//   } else {
//     return res.status(401).end();
//   }
//
// };


let authCheck = wrap(async (req, res) => {
  if (req.headers.token === "aaa") {

  } else {
    res.status(401).end();
  }
});

module.exports = authCheck;
