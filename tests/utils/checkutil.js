import chai from 'chai';
import {isEmptyObject, isSet, isStringSet} from "../../src/utils/checkutil";
const expect = chai.expect;

describe("Test checkutil.js", () => {
    describe("Test isSet(input)", () => {
        it('input = null', () => {
            const input = null;
            const result = isSet(input);
            expect(result).to.be.false;
        });
        it('input = undefined', () => {
            const input = undefined;
            const result = isSet(input);
            expect(result).to.be.false;
        });
        it('input = "pritam"', () => {
            const input = "pritam";
            const result = isSet(input);
            expect(result).to.be.true;
        });
        it('testing boolean by setting input = true', () => {
            const input = true;
            const result = isSet(input);
            expect(result).to.be.true;
        });
        it('testing object by setting input = {}', () => {
            const input = {};
            const result = isSet(input);
            expect(result).to.be.true;
        });
    });
    describe("Test isStringSet(input)", () => {
        it('input = null', () => {
            const input = null;
            const result = isStringSet(input);
            expect(result).to.be.false;
        });
        it('input = undefined', () => {
            const input = undefined;
            const result = isStringSet(input);
            expect(result).to.be.false;
        });
        it('input = "pritam"', () => {
            const input = "pritam";
            const result = isStringSet(input);
            expect(result).to.be.true;
        });
        it('testing boolean by setting input = true', () => {
            const input = true;
            const result = isStringSet(input);
            expect(result).to.be.false;
        });
        it('testing object by setting input = {}', () => {
            const input = {};
            const result = isStringSet(input);
            expect(result).to.be.false;
        });
    });
    describe("Test isEmptyObject(obj)", () => {
        it('testing boolean by setting input = true', () => {
            const input = {};
            const result = isEmptyObject(input);
            expect(result).to.be.true;
        });
        it('testing object by setting input = {}', () => {
            const input = {test1: "abc", test2: "xyz"};
            const result = isEmptyObject(input);
            expect(result).to.be.false;
        });
    });
});