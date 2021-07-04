const sessionHelper = require('../helpers/session-helper');
const requestHelper = require('../helpers/request-helper');
const fileLoader = require('../filecache/file-loader');
const util = require('../utils/util');

const sendResponse = (res) => {
    const trackImg = fileLoader.getAnalyticsPixelGif();
    res.writeHead(200, {
        'Content-Type': 'image/gif'
    });
    res.send(trackImg);
};

const handleSession = (req, res) => {
    try {
        const sessionData = sessionHelper.getSessionData(req);
        const currentCampaign = requestHelper.getCampaignFromQueryParam(req);
        const currentReferrer = requestHelper.getRefererFromQueryParam(req);
        if (!util.isStringSet(currentCampaign) || !util.isStringSet(currentReferrer)) {
            return sendResponse(res);
        }
        if (sessionHelper.shouldStartNewSession(sessionData, currentCampaign)) {
            sessionHelper.startNewSession(res, currentReferrer, currentCampaign);
        } else {
            sessionHelper.updateSession(res, sessionData, currentReferrer);
        }
        sendResponse(res);
    } catch (e) {
        res.status(500).end();
    }
};
module.exports = {handleSession};