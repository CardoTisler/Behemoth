const request = require("supertest");
const should = require("should")
const chai = require("chai")
const expect = chai.expect;
const assert = chai.assert;
const app = require("app.ts")
const connection = require("db/index")
const PORT = process.env.DEV_PORT || 3001;
let server = null;

describe("Test database connectivity", () => {
    before("Connect to database", (done) => {
        connection.connect()
            .then(() => {
                server = app.listen(PORT)
            }).then(() => done())
    })
    after("Disconnect from database", (done) => {
        connection.disconnect()
        server.close()
        done()
    })
    it("GET /categories/show returns statusCode 200", (done) => {
        request(app).get("/categories/show").expect(200, done)
    })
    it("GET /transactions/show returns statusCode 400", (done) => {
        request(app).get("/transactions/show").expect(200, done)
    })
})
