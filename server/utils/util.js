const isSet = (input) => {
    return typeof input !== "undefined" && input !== null;
};
const isStringSet = (str) => {
    return isSet(str) && typeof str === "string" && str !== "";
};

const characters ='abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

const generateSessionId = (length) => {
    length = 11;
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
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

module.exports = {
    isSet,
    isStringSet,
    generateSessionId,
    isEmptyObject,
    getMillisecondsUntilMidnight
};