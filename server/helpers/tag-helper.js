const requestHelper = require('../helpers/request-helper');
const sessionHelper = require('../helpers/session-helper');
const util = require('../utils/util');
const constants = require('../constants/constants');

const getSessionDataForTag = (req, res) => {
    const referrerFromHeaders = requestHelper.getReferrerFromHeader(req);
    if (!util.isStringSet(referrerFromHeaders)) {
        return '{}';
    }
    const queryParamsOfReferrer = util.getQueryParamMap(referrerFromHeaders);
    const currentCampaign = queryParamsOfReferrer[constants.ReferrerQueryParams.CAMPAIGN] || "";
    if (!util.isStringSet(currentCampaign)) {
        return '{}';
    }
    const sessionData = sessionHelper.getSessionData(req);
    const currentReferrer = util.getUrlWithoutQueryParams(referrerFromHeaders);
    if (sessionHelper.shouldStartNewSession(sessionData, currentCampaign)) {
        return sessionHelper.startNewSession(res, currentReferrer, currentCampaign);
    }
    return sessionHelper.updateSession(res, sessionData, currentReferrer);
};


module.exports = {
    getSessionDataForTag
};