const QueryParams = {
    CAMPAIGN: 'cmp',
    REFERRER: 'rf'
};
const ReferrerQueryParams = {
    CAMPAIGN: 'campaign'
};
const Cookie = {
    SESSION_COOKIE_NAME: "instsn",
    MAX_COOKIE_EXPIRY: 30*60*1000
};
const Headers = {
    REFERRER: 'Referer'
};
const SessionData = {
    ID: 'id',
    EXPIRATION: 'expiration',
    REFERRER: 'referrer',
    CAMPAIGN: 'campaign'
};
const Misc = {
    SESSION_DATE_FORMAT: "YYYY-MM-DD HH:mm:ss:SSS"
};



module.exports = {
    QueryParams: QueryParams,
    Cookie: Cookie,
    Headers: Headers,
    SessionData: SessionData,
    ReferrerQueryParams: ReferrerQueryParams,
    Misc: Misc
};