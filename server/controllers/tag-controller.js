const tagHelper = require('../helpers/tag-helper');
const fileLoader = require('../filecache/file-loader');

const fetchSessionData = (req, res) => {
    return tagHelper.getSessionDataForTag(req, res);
};
const fetchEnd = () => {
    const end = "} catch(e) {}";
    return end;
};
const fetchJsTagBundle = () => {
    return fileLoader.getInsticatorTagBundle();
};

const fetchStart = (req, res) => {
    const start = "try" +
        "{" +
        "window.inst = window.inst || {};" +
        "window.inst.sdata = " +
        fetchSessionData(req, res) +
        ";";
    return start;
};
const fetchTagContent = (req, res) => {
    res.type("text/javascript");
    res.status(200);
    res.send(fetchStart(req, res) + fetchJsTagBundle() + fetchEnd())
};


module.exports = {fetchTagContent};
