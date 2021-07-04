import chai from 'chai';
import {isValidSession} from "../../src/session/session-manager";

const expect = chai.expect;


describe("Test session-manager.js", () => {
    describe("test isValidSession(sessionData)", () => {
        it('sessionData is empty', () => {
            let sessionData = {};
            expect(isValidSession(sessionData)).to.be.false;
            sessionData = {
                campaign: "google",
                expiration: "2021-07-04 19:57:32:330",
                id: "jlpfk4cj4xw",
                referrer: "http://localhost:3000/test-page/test-session.html"
            };
            expect(isValidSession(sessionData)).to.be.true;
        });
    })
});