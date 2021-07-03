const constants = require('../constants/constants');


const getRefererFromQueryParam = (req) => {
    return req.query[constants.QueryParams.REFERRER] || "";
};
const getCampaignFromQueryParam = (req) => {
    return req.query[constants.QueryParams.CAMPAIGN] || "";
};
const getReferrerFromHeader = (req) => {
    return req.header(constants.Headers.REFERRER) || "";
};

module.exports = {
    getRefererFromQueryParam,
    getCampaignFromQueryParam,
    getReferrerFromHeader
};

