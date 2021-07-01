const util = require('../utils/util');
const moment = require('moment');

const SESSION_COOKIE_NAME = 'instsn';
const CAMPAIGN_QUERY_PARAM = 'campaign';
const MAX_COOKIE_EXPIRY = 30*60*1000;
const SESSION_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss:SSS';

const getReferer = (req) => {
    return req.header('Referer') || "";
};

const createSessionCookieValue = (sessionId, expiryTime, referrer, campaign) => {
    let sessionData = {};
    sessionData.id = sessionId;
    sessionData.expiration = expiryTime;
    sessionData.referrer = referrer;
    sessionData.campaign = campaign;
    return JSON.stringify(sessionData);
};

const getCampaign = (req) => {
    return req.query[CAMPAIGN_QUERY_PARAM] || "";
};
const getSessionCookieValue = (req) => {
    return req.cookies[SESSION_COOKIE_NAME] || "";
};
const getSessionData = (req) => {
    const sessionCookieValue = getSessionCookieValue(req);
    let sessionObject;
    try {
        sessionObject = JSON.parse(sessionCookieValue);
    } catch (e) {
        sessionObject = {};
    }
    return sessionObject;
};
const hasSessionExpired = (sessionData) => {
    const expiryTime = sessionData.expiration;
    if (!util.isStringSet(expiryTime)) {
        return true;
    }
    return new Date().getTime() > moment(expiryTime, SESSION_DATE_FORMAT).utc().toDate().getTime();
};
const hasCampaignChanged = (sessionData, req) => {
    const campaignFromSession = sessionData.campaign || "";
    const campaginInRequest = getCampaign(req);
    return campaginInRequest === campaignFromSession;
};
const getCookieExpiry = () => {
    return Math.min(MAX_COOKIE_EXPIRY, util.getMillisecondsUntilMidnight());
};

const shouldStartNewSession = (sessionData, req) => {
    if (util.isEmptyObject(sessionData)) {
        return true;
    }
    return hasSessionExpired(sessionData) || hasCampaignChanged(sessionData, req);
};
const startNewSession = (req, res) => {
    const cookieExpiry = getCookieExpiry();
    const expiryDate = moment().utc().add(cookieExpiry, 'ms');
    const expiryTime = expiryDate.format(SESSION_DATE_FORMAT);
    const sessionCookieValue = createSessionCookieValue(util.generateSessionId(), expiryTime, getReferer(req), getCampaign(req));
    res.cookie(SESSION_COOKIE_NAME, sessionCookieValue, {maxAge: getCookieExpiry()});
};
const updateSession = (req, res) => {
    const sessionCookieValue = getSessionCookieValue(req);
    res.cookie(SESSION_COOKIE_NAME, sessionCookieValue, {maxAge: getCookieExpiry()});
};

const createOrUpdateSession = (req, res) => {
    try {
        const sessionData = getSessionData(req);
        if (shouldStartNewSession(sessionData, req)) {
            startNewSession(req, res);
        } else {
            updateSession(req, res);
        }
    } catch (e) {
    }
    const trackImg = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/gif'
    });
    res.end(trackImg);
};
module.exports = {createOrUpdateSession};