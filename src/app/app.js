import {handleSession, initializeVariables} from "../core/core";

function init() {
    window.console.log("script has started executing");
    initializeVariables();
    handleSession();
}
init();