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

module.exports = {isSet, isStringSet, generateSessionId};