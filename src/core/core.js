import {getSession, getSessionData, isValidSession} from "../session/session-manager";

export function handleSession() {
    const sessionData = getSessionData();
    if (isValidSession(sessionData)) {
        return;
    }
    getSession();
}
export function initializeVariables() {
    window.inst = window.inst || {};
}