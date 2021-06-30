const express = require ('express');
var cookieParser = require('cookie-parser');
const tagRoute = require('./routes/tag');
const sessionRoute = require('./routes/session');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', tagRoute);
app.use('/', sessionRoute);

const listener = app.listen(3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})