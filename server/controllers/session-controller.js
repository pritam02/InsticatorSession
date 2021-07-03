const sessionHelper = require('../helpers/session-helper');
const requestHelper = require('../helpers/request-helper');
const fileLoader = require('../filecache/file-loader');

const handleSession = (req, res) => {
    try {
        const sessionData = sessionHelper.getSessionData(req);
        const currentCampaign = requestHelper.getCampaignFromQueryParam(req);
        const currentReferrer = requestHelper.getRefererFromQueryParam(req);
        if (sessionHelper.shouldStartNewSession(sessionData, currentCampaign)) {
            sessionHelper.startNewSession(res, currentReferrer, currentCampaign);
        } else {
            sessionHelper.updateSession(res, sessionData, currentReferrer);
        }
        const trackImg = fileLoader.getAnalyticsPixelGif();
        res.writeHead(200, {
            'Content-Type': 'image/gif'
        });
        res.send(trackImg);
    } catch (e) {
        res.status(500).send();
    }
};
module.exports = {handleSession};