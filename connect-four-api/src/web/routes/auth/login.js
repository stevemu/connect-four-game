let Membership = require('../../../lib/membership');


let Login = function (app, db) {

  let membership = new Membership(db);

  app.post('/auth/login/', async (req, res) => {
    try {

      let result = await membership.authenticate(req.body);
      result.token = "aaaa";
      res.json(result);

    } catch (err) {
      return res.json({success: false});
    }
  });




};

module.exports = Login;
