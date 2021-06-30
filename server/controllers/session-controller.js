const util = require('../utils/util');
var dateFormat = require("dateformat");


const SESSION_COOKIE_NAME = 'instsn';
const CAMPAIGN_QUERY_PARAM = 'campaign';
const COOKIE_EXPIRY = 30000;

const getSessionCookieValue = (sessionId, expiryTime, referrer, campaign) => {
    let sessionData = {};
    sessionData.id = sessionId;
    sessionData.expiration = expiryTime;
    sessionData.referrer = referrer;
    sessionData.campaign = campaign;
    return JSON.stringify(sessionData);
};

const getCampaign = (req) => {
    return req.query[CAMPAIGN_QUERY_PARAM] || "facebook";
};

const shouldStartNewSession = (cookieValue) => {
    return !util.isStringSet(cookieValue);
};
const startNewSession = (req, res) => {
    const expiryTime = dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss:l');
    console.log(getCampaign(req));
    const sessionCookieValue = getSessionCookieValue(util.generateSessionId(), expiryTime, "https://abc.com", getCampaign(req));
    console.log(sessionCookieValue);
    res.cookie(SESSION_COOKIE_NAME, sessionCookieValue, {maxAge: 30000});
};

const createOrUpdateSession = (req, res) => {
    try {
        const sessionCookieValue = req.cookies[SESSION_COOKIE_NAME];
        console.log(sessionCookieValue);
        if (shouldStartNewSession(sessionCookieValue)) {
            startNewSession(req, res);
        }
    } catch (e) {
        console.log("error occurred");
    }
    res.type("image/gif");
    res.status(200);
    res.send("");
};
module.exports = {createOrUpdateSession};