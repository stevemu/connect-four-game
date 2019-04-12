let HappyRoute = function (app) {

  app.get('/happy/more', (req, res) => {
    res.json({success: true});
  });
};

module.exports = HappyRoute;
