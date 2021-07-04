const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../webserver/app");
const constants = require("../../webserver/constants/constants");
const expect = chai.expect;
const cookieHelper = require('../../webserver/helpers/cookie-helper');
const moment = require('moment');
const cookie = require('cookie');

chai.use(chaiHttp);

describe("Test Analytics Endpoint For Session", () => {
    describe("GET /insticator/session", () => {
        describe("No Referrer And Campaign Sent", () => {
            it('Should return a gif response with Status 200 and No Session Cookie Set', (done) => {
                chai.request(app)
                    .get('/insticator/session')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res).to.not.have.cookie(constants.Cookie.SESSION_COOKIE_NAME);
                        expect(res).to.have.header('content-type', 'image/gif');
                    });
                done();
            });
        });
        describe("Referrer Sent And Campaign Not Sent", () => {
            it('Should return a gif response with Status 200 and No Session Cookie Set', (done) => {
                chai.request(app)
                    .get('/insticator/session')
                    .query({rf: "https://google.com"})
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res).to.not.have.cookie(constants.Cookie.SESSION_COOKIE_NAME);
                        expect(res).to.have.header('content-type', 'image/gif');
                    });
                done();
            });
        });
        describe("Referrer Not Sent And Campaign Sent", () => {
            it('Should return a gif response with Status 200 and No Session Cookie Set', (done) => {
                chai.request(app)
                    .get('/insticator/session')
                    .query({cmp: "samusung"})
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res).to.not.have.cookie(constants.Cookie.SESSION_COOKIE_NAME);
                        expect(res).to.have.header('content-type', 'image/gif');
                    });
                done();
            });
        });
        describe("Invalid Referrer Sent", () => {
            it('Should return status 422', (done) => {
                chai.request(app)
                    .get('/insticator/session')
                    .query({cmp: "samusung", rf: "https://facebook.com/ads<scrip"})
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(422);
                        expect(res).to.not.have.cookie(constants.Cookie.SESSION_COOKIE_NAME);
                        expect(res).to.not.have.header('content-type', 'image/gif');
                    });
                done();
            });
        });
        describe("Invalid Campaign Sent", () => {
            it('Should return status 422', (done) => {
                chai.request(app)
                    .get('/insticator/session')
                    .query({cmp: "samusung<script", rf: "https://facebook.com/ads"})
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(422);
                        expect(res).to.not.have.cookie(constants.Cookie.SESSION_COOKIE_NAME);
                        expect(res).to.not.have.header('content-type', 'image/gif');
                    });
                done();
            });
        });
        describe("Referrer And Campaign Sent", () => {
            it('Should return a gif response with Status 200 and Session Cookie Set', (done) => {
                chai.request(app)
                    .get('/insticator/session')
                    .query({cmp: "samsung", rf: "https://facebook.com/ads"})
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res).to.have.cookie(constants.Cookie.SESSION_COOKIE_NAME);
                        expect(res).to.have.header('content-type', 'image/gif');

                        const parsedSetCookieHeader = cookie.parse(res.header['set-cookie'][0]);
                        const sessionCookieValue = parsedSetCookieHeader[constants.Cookie.SESSION_COOKIE_NAME];
                        expect(sessionCookieValue).to.exist;
                        expect(sessionCookieValue.length).to.be.above(0, "Session Cookie should have a valid length");
                        let sessionCookieObject;
                        try {
                            sessionCookieObject = JSON.parse(sessionCookieValue);
                        } catch (e) {
                            sessionCookieObject = {};
                        }
                        expect(sessionCookieObject[constants.SessionData.ID]).to.exist;
                        expect(sessionCookieObject[constants.SessionData.REFERRER]).to.exist;
                        expect(sessionCookieObject[constants.SessionData.CAMPAIGN]).to.exist;
                        expect(sessionCookieObject[constants.SessionData.EXPIRATION]).to.exist;
                        expect(sessionCookieObject[constants.SessionData.ID].length).to.be.above(0, "Session id should be a valid string");
                        expect(sessionCookieObject[constants.SessionData.REFERRER]).to.equal("https://facebook.com/ads");
                        expect(sessionCookieObject[constants.SessionData.CAMPAIGN]).to.equal("samsung");

                        const cookieExpiry = cookieHelper.getCookieExpiry();
                        const expirationDate = sessionCookieObject[constants.SessionData.EXPIRATION];
                        let duration = moment.duration(moment.utc(expirationDate, constants.Misc.SESSION_DATE_FORMAT).diff(moment().utc())).asMinutes();
                        duration = Math.ceil(duration);
                        const durationInMilliseconds = duration*60*1000;
                        expect(durationInMilliseconds).to.equal(cookieExpiry, "Cookie Expiry should match the duration time");
                    });
                done();
            });
        });
    });
});