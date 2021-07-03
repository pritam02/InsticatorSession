

const isSet = (input) => {
    return typeof input !== "undefined" && input !== null;
};
const isStringSet = (str) => {
    return isSet(str) && typeof str === "string" && str !== "";
};

const characters = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

const generateSessionId = (length) => {
    length = 11;
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};
const isEmptyObject = (obj) => {
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
};
const getMillisecondsUntilMidnight = () => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    return (midnight.getTime() - new Date().getTime());
};
const getUrlWithoutQueryParams = (inputUrl) => {
    return inputUrl.split("?")[0].split("#")[0];
};
const getQueryParamMap = (url) => {
    // URL is empty
    if (!isStringSet(url)) {
        return {};
    }
    let k, a, pm = {}, i, p;
    k = url.indexOf("?");
    if (k === -1) {
        return pm;
    }
    a = url.substring(k + 1).split("&");
    i = a.length;
    while (i--) {
        p = a[i].split('=');
        pm[p[0]] = p[1];
    }
    return pm;
};

module.exports = {
    isSet,
    isStringSet,
    generateSessionId,
    isEmptyObject,
    getMillisecondsUntilMidnight,
    getUrlWithoutQueryParams,
    getQueryParamMap
};