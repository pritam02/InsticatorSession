const express = require ('express');
var cookieParser = require('cookie-parser');
const tagRoute = require('./routes/tag');
const sessionRoute = require('./routes/session');
const fileLoader = require('./filecache/file-loader');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', tagRoute);
app.use('/', sessionRoute);
app.use('/test-page', express.static(__dirname + '/test-pages'));

const listener = app.listen(3000, () => {
    fileLoader.loadInsticatorBundleInMemory();
    fileLoader.loadAnalyticsPixelGifInMemory();
    console.log('Your app is listening on port ' + listener.address().port)
});