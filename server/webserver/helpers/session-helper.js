const cookieHelper = require('../helpers/cookie-helper');
const util = require('../utils/util');
const constants = require('../constants/constants');
const moment = require('moment');

const getSessionData = (req) => {
    const sessionCookieValue = cookieHelper.getSessionCookieValue(req);
    let sessionObject;
    try {
        sessionObject = JSON.parse(sessionCookieValue);
    } catch (e) {
        sessionObject = {};
    }
    return sessionObject;
};
const createSessionCookieValue = (sessionId, expiryTime, referrer, campaign) => {
    let sessionData = {};
    try {
        sessionData[constants.SessionData.ID] = sessionId;
        sessionData[constants.SessionData.EXPIRATION] = expiryTime;
        sessionData[constants.SessionData.REFERRER] = referrer;
        sessionData[constants.SessionData.CAMPAIGN] = campaign;
    } catch (e) {
        sessionData = {};
    }
    return JSON.stringify(sessionData);
};
const hasSessionExpired = (sessionData) => {
    const expiryTime = sessionData[constants.SessionData.EXPIRATION];
    if (!util.isStringSet(expiryTime)) {
        return true;
    }
    return moment.utc(expiryTime, constants.Misc.SESSION_DATE_FORMAT).isBefore(moment().utc());
};
const hasCampaignChanged = (sessionData, currentCampaign) => {
    const campaignFromSession = sessionData[constants.SessionData.CAMPAIGN] || "";
    return currentCampaign !== campaignFromSession;
};

const startNewSession = (res, currentReferrer, currentCampaign) => {
    const cookieExpiry = cookieHelper.getCookieExpiry();
    const expiryDate = moment().utc().add(cookieExpiry, 'ms');
    const expiryTime = expiryDate.format(constants.Misc.SESSION_DATE_FORMAT);
    const sessionCookieValue = createSessionCookieValue(util.generateSessionId(), expiryTime, currentReferrer, currentCampaign);
    res.cookie(constants.Cookie.SESSION_COOKIE_NAME, sessionCookieValue, {maxAge: cookieExpiry});
    return sessionCookieValue;
};
const updateSession = (res, sessionData, currentReferrer) => {
    const cookieExpiry = cookieHelper.getCookieExpiry();
    const expiryDate = moment().utc().add(cookieExpiry, 'ms');
    const expiryTime = expiryDate.format(constants.Misc.SESSION_DATE_FORMAT);
    const sessionCookieValue = createSessionCookieValue(sessionData[constants.SessionData.ID], expiryTime, currentReferrer, sessionData[constants.SessionData.CAMPAIGN]);
    res.cookie(constants.Cookie.SESSION_COOKIE_NAME, sessionCookieValue, {maxAge: cookieExpiry});
    return sessionCookieValue;
};

const shouldStartNewSession = (sessionData, currentCampaign) => {
    if (util.isEmptyObject(sessionData)) {
        return true;
    }
    if (!util.isStringSet(sessionData[constants.SessionData.ID])) {
        return true;
    }
    return hasSessionExpired(sessionData) || hasCampaignChanged(sessionData, currentCampaign);
};


module.exports = {
    getSessionData,
    shouldStartNewSession,
    startNewSession,
    updateSession
};