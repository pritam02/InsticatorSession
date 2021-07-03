export function isSet(input) {
    return typeof input !== "undefined" && input !== null;
}

export function isStringSet(str) {
    return isSet(str) && typeof str === "string" && str !== "";
}
export function isEmptyObject(obj) {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
}