const app = require ('./app');

const fileLoader = require('./filecache/file-loader');

const listener = app.listen(3000, () => {
    fileLoader.loadInsticatorBundleInMemory();
    fileLoader.loadAnalyticsPixelGifInMemory();
    console.log('Your app is listening on port ' + listener.address().port)
});