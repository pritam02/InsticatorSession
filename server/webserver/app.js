const express = require ('express');
const cookieParser = require('cookie-parser');
const tagRoute = require('./routes/tag');
const sessionRoute = require('./routes/session');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', tagRoute);
app.use('/', sessionRoute);
app.use('/test-page', express.static(__dirname + '/test-pages'));


module.exports = app;