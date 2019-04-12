let Board  = require( '../../../lib/board');

let BoardRoute = function (app, db) {

  let board = new Board(db);

  app.get('/board/:userId', async (req, res) => {
    let userId = req.params.userId;
    let result = await board.getBoardAndTurn(userId);
    return res.json(result);
  });

  app.post('/board-update/', async (req, res) => {

    try {

      let userId = req.body.userId;
      let newBoard = req.body.board;

      // make the other player the active player
      let userHasTurn = userId == 1 ? 2 : 1;

      await board.saveUserTurn({
        type: 'userTurn',
        value: userHasTurn
      });

      // save the board
      await board.saveBoard({
        type: 'board',
        value: newBoard
      });
      res.json({success: true});

    } catch (err) {
      console.log(err);
      res.status(401).json({err: err});
    }


  });


  app.post('/reset-board', async (req, res) => {

    try {
      await board.resetBoard();
      res.status(200).json({success: true});
    } catch (err) {
      res.status(500);
    }

  });

};

module.exports = BoardRoute;
