const request = require("request");
const should = require("should")
const chai = require("chai")
const expect = chai.expect;
const assert = chai.assert;

describe("Category Tests", () => {
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
    it("Categories have content", (done) => {
        request.get({url: "http://localhost:3001/categories/show"}, async (err, res, body) => {
            var _body = {};
            try { _body = JSON.parse(body); }
            catch (e) { _body = {}; }
            expect(res.statusCode).to.equal(200);
            expect(_body).to.have.property("incomeCategories");
            expect(_body.incomeCategories).to.have.lengthOf.greaterThan(0);
            done();
        })
    })
})

describe("Transaction Tests", () => {
    it("Transactions have content", (done) => {
        request.get({url: "http://localhost:3001/transactions/show"}, async (err, res, body) => {
            var _body = {};
            try {
                _body = JSON.parse(body);
            } catch (e) {
                _body = {};
            }
            expect(res.statusCode).to.equal(200);
            expect(_body.transactionsList).to.have.lengthOf.greaterThan(0);
            done();
        });
    })
})