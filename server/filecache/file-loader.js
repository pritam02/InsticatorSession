const util = require('../utils/util');
const fs = require("fs");


let insticatorBundle;
let analyticsPixelGif;

const getInsticatorTagBundle = () => {
    if (!util.isSet(insticatorBundle)) {
        loadInsticatorBundleInMemory();
    }
    return insticatorBundle || "";
};

const loadInsticatorBundleInMemory = () => {
    try {
        insticatorBundle = fs.readFileSync('dist/insticator_session_bundle.js').toString();
    } catch (e) {

    }
};
const loadAnalyticsPixelGifInMemory = () => {
    try {
        analyticsPixelGif = fs.readFileSync('resources/analytics.gif').toString();
    } catch (e) {

    }
};
const getAnalyticsPixelGif = () => {
    if (!util.isSet(analyticsPixelGif)) {
        loadAnalyticsPixelGifInMemory();
    }
    return analyticsPixelGif || Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
};


module.exports = {
    loadInsticatorBundleInMemory,
    getInsticatorTagBundle,
    loadAnalyticsPixelGifInMemory,
    getAnalyticsPixelGif
};