import {isEmptyObject, isStringSet} from "../utils/checkutil";
import {encodeParam, getCleanPublisherUrl, getPublisherUrl, getQueryParamValue} from "../utils/urlutil";

const ANALYTICS_PIXEL_BASE_URL = "http://localhost:3000/insticator/session";

export function getSessionData() {
    return window.inst.sdata || {};
}

export function isValidSession(sessionData) {
    return !isEmptyObject(sessionData) && isStringSet(sessionData.id);
}
export function getSession() {
    fireAnalyticsPixel();
}

function fireAnalyticsPixel() {
    const analyticsPixelEndpoint = getAnalyticsPixelEndpoint();
    if (!isStringSet(analyticsPixelEndpoint)) {
        return;
    }
    (new Image()).src = getAnalyticsPixelEndpoint();
}

function getAnalyticsPixelEndpoint() {
    const cleanPublisherUrl = getCleanPublisherUrl();
    const campaign = getQueryParamValue(getPublisherUrl(), "campaign");
    if (!isStringSet(cleanPublisherUrl) || !isStringSet(campaign)) {
        return;
    }
    return ANALYTICS_PIXEL_BASE_URL + "?rf=" + encodeParam(cleanPublisherUrl) + "&cmp=" + encodeParam(campaign);
}