const fs = require("fs");

const fetchSessionData = () => {
    return "{}";
};
const fetchEnd = () => {
    const end = "} catch(e) {}";
    return end;
};
const fetchJsTagBundle = () => {
    try {
        const fileContentWriter = fs.readFileSync('dist/insticator_session_bundle.js');
        return fileContentWriter.toString();
    } catch (e) {
        return "";
    }
};

const fetchStart = (req) => {
    const start = "try" +
        "{" +
        "window.inst = window.inst || {};" +
        "window.inst.sdata = " +
        fetchSessionData() +
        ";"
    return start;
};
const fetchTagContent = (req, res) => {
    res.type("text/javascript");
    res.status(200);
    res.send(fetchStart(req) + fetchJsTagBundle() + fetchEnd())
};


module.exports = {fetchTagContent};
