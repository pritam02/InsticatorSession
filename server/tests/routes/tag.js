const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../webserver/app");
const constants = require("../../webserver/constants/constants");
const cookieHelper = require('../../webserver/helpers/cookie-helper');
const moment = require('moment');
const expect = chai.expect;
const cookie = require('cookie');

chai.use(chaiHttp);

describe("Test Client Side SDK", () => {
    describe("GET /instag.js", () => {
        describe("No Referrer Sent", () => {
            it('Should return a valid JS response with No Session Cookie Set', (done) => {
                chai.request(app)
                    .get('/instag.js')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res).to.not.have.cookie(constants.Cookie.SESSION_COOKIE_NAME);
                        expect(res).to.have.header('content-type', /^text\/javascript/);
                        expect(res.text).to.exist;
                        expect(res.text.length).to.be.above(0, "Size of the JS response should be greater than 0");
                        expect(res.text).to.have.string("window.inst", "The global namespace variable should be present");
                    });
                done();
            });
        });
        describe("Referrer sent without campaign in query params", () => {
            it('Should return a valid JS response with No Session Cookie Set', (done) => {
                chai.request(app)
                    .get('/instag.js')
                    .set('Referer', 'https://google.com')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res).to.not.have.cookie(constants.Cookie.SESSION_COOKIE_NAME);
                        expect(res).to.have.header('content-type', /^text\/javascript/);
                        expect(res.text).to.exist;
                        expect(res.text.length).to.be.above(0, "Size of the JS response should be greater than 0");
                        expect(res.text).to.have.string("window.inst", "The global namespace variable should be present");
                    });
                done();
            });
        });
        describe("Referrer sent with campaign=cars in query params", () => {
            it('Should return a valid JS response with Session Cookie Set', (done) => {
                chai.request(app)
                    .get('/instag.js')
                    .set('Referer', 'https://google.com?campaign=cars')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res).to.have.header('content-type', /^text\/javascript/);
                        expect(res.text).to.exist;
                        expect(res.text.length).to.be.above(0, "Size of the JS response should be greater than 0");
                        expect(res.text).to.have.string("window.inst", "The global namespace variable should be present");
                        expect(res).to.have.cookie(constants.Cookie.SESSION_COOKIE_NAME);

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
                        expect(sessionCookieObject[constants.SessionData.REFERRER]).to.equal("https://google.com");
                        expect(sessionCookieObject[constants.SessionData.CAMPAIGN]).to.equal("cars");

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
        describe("Referrer sent with campaign=shoes in query params", () => {
            it('Should return a valid JS response with Session Cookie Set', (done) => {
                chai.request(app)
                    .get('/instag.js')
                    .set('Referer', 'https://facebook.com/ads?campaign=shoes')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res).to.have.header('content-type', /^text\/javascript/);
                        expect(res.text).to.exist;
                        expect(res.text.length).to.be.above(0, "Size of the JS response should be greater than 0");
                        expect(res.text).to.have.string("window.inst", "The global namespace variable should be present");
                        expect(res).to.have.cookie(constants.Cookie.SESSION_COOKIE_NAME);

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
                        expect(sessionCookieObject[constants.SessionData.CAMPAIGN]).to.equal("shoes");

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