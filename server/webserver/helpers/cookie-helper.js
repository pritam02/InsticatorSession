const constants = require('../constants/constants');
const util = require('../utils/util');


const getSessionCookieValue = (req) => {
    return req.cookies[constants.Cookie.SESSION_COOKIE_NAME] || "";
};
const getCookieExpiry = () => {
    return Math.min(constants.Cookie.MAX_COOKIE_EXPIRY, util.getMillisecondsUntilMidnight());
};

module.exports = {
    getSessionCookieValue,
    getCookieExpiry
};