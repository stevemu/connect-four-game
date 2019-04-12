let express =  require('express');
let cors = require('cors');
let https = require('https');
let fs = require('fs');
let path = require('path');
let bodyParer = require('body-parser');

/* eslint-disable no-console */

const app = express();
app.use(cors());
app.use(bodyParer.json({limit: '5000mb'}));


app.get('/', function(request, response) {
  response.send('Welcome to MERN starter api server!');
});

app.get('/portfolios', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([
    {id: 1, "name": "Boston Angel Club","link":"https://bacinvest.com/"},
    {id: 2, "name": "Live Train Departure","link":"http://stevemu.com:3000/"}
  ]);
});

let MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://steve:steve@ds121495.mlab.com:21495/connect-four').then((db) => {
  console.log('connected');
  require('./routes/board/boardRoute')(app, db);
});



let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`HTTP server is running at port ${PORT}`);
});
