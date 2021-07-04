const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../webserver/app");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Test Health Check", () => {
    describe("GET /health", () => {
        it('server should be up and running', (done) => {
            chai.request(app)
                .get('/health')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                });
            done();
        });
    });
    describe("GET /random", () => {
        it('Endpoint should not exist', (done) => {
            chai.request(app)
                .get('/random')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                });
            done();
        });
    });
});