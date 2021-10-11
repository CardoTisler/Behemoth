// const server = require('../server');
const request = require("request");
const should = require("should")
const chai = require("chai")
const expect = chai.expect;
const assert = chai.assert;
const urlBase = "https://api.magicthegathering.io/v1";
// const App = require("./App");

// it("GET /categories/falserequest", async () => {
//     return request(server).get("/categories/falserequest").expect(404);
// });

describe("API Tests", () => {
    it("Categories include NONE category", (done) => {
        request.get({url: "http://localhost:3001/categories/show"}, async (err, res, body) => {
            var _body = {};
            try {
                _body = JSON.parse(body);
            } catch (e) {
                _body = {};
            }
            expect(res.statusCode).to.equal(200)
            if(_body.should.have.property("noneCategory")){
                assert.typeOf(_body.noneCategory, 'Object')
            };
            done();
        });
    })
})