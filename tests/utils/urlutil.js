import {encodeParam, getCleanPublisherUrl, getPublisherUrl, getQueryParamValue} from "../../src/utils/urlutil";
import chai from 'chai';
const expect = chai.expect;


describe("Test urlutil.js", () => {
    global.window = {
        location: {
            href: 'https://webmd.com/diet/news/20190712/300-fewer-calories-a-day-brings-a-health-benefit?campaign=adwords&force_bid=true'
        }
    };
    describe("test getPublisherUrl()", () => {
        it('get value of publisher url from location object', () => {
            const publisherUrl = getPublisherUrl();
            expect(publisherUrl).to.equal('https://webmd.com/diet/news/20190712/300-fewer-calories-a-day-brings-a-health-benefit?campaign=adwords&force_bid=true');
        });
    });
    describe("test getCleanPublisherUrl()", () => {
        it('get value of publisher url from location object without considering query params and hash params', () => {
            const publisherUrl = getCleanPublisherUrl();
            expect(publisherUrl).to.equal('https://webmd.com/diet/news/20190712/300-fewer-calories-a-day-brings-a-health-benefit');
        });
    });
    describe("test getQueryParamValue(url, param)", () => {
        it('get query params from a url as a map', () => {
            const inputUrl = 'http://example.com?a=2&b=3#111';
            const valueOfA = getQueryParamValue(inputUrl, "a");
            const valueOfB = getQueryParamValue(inputUrl, "b");
            const valueOfC = getQueryParamValue(inputUrl, "c");
            expect(valueOfA).to.equal("2");
            expect(valueOfB).to.equal("3");
            expect(valueOfC).to.equal("");
        });
    });
    describe("test encodeParam(param)", () => {
        it('url encode any value', () => {
            expect(encodeParam("abc123")).to.equal("abc123");
            expect(encodeParam("ac12$d&{")).to.equal("ac12%24d%26%7B");
        });
    });
});