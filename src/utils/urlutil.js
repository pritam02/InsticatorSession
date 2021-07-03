import {isStringSet} from "./checkutil";

export function getCleanPublisherUrl() {
    const publisherUrl = window.location.href;
    return publisherUrl.split("?")[0].split("#")[0];
}
export function getPublisherUrl() {
    return window.location.href;
}

function getQueryParamsFromUrl(url) {
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
}

export function getQueryParamValue(url, param) {
    const queryParams = getQueryParamsFromUrl(url);
    return queryParams[param] || "";
}
export function encodeParam(param) {
    if (!isStringSet(param)) {
        return '';
    }
    return encodeURIComponent(param);
}