// This file configures a web server for testing the production build
// on your local machine.

import {chalkProcessing} from './chalkConfig';
import fallback from 'express-history-api-fallback';

/* eslint-disable no-console */

const express =  require('express');
const cors = require('cors');
const path = require('path');
const bodyParer = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParer.json({limit: '5000mb'}));

console.log(chalkProcessing('Opening production build...'));

// server static files
app.use(express.static(path.resolve(__dirname, '../dist')));
const root = path.resolve(__dirname, '../dist');
app.use(fallback('index.html', { root }));


const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log('production front-end server is running at port ' + PORT);
});
