const app = require("app.ts");
const connection = require("db/index");
const request = require("supertest");

const PORT = process.env.DEV_PORT || 3001;
let server = null;

describe("Transaction Tests", () => {
    before("Connect to database", (done) => {
        connection.connect()
            .then(() => {
                server = app.listen(PORT)
            }).then(() => done())
    })
    beforeEach("Clear Transactions collection of existing data", (done) => {
        request(app)
            .delete("/transactions/deleteAll")
            .expect(200, done)
    })
    after("Disconnect from database", (done) => {
        connection.disconnect()
        server.close()
        done()
    })


    it("Adding Transaction returns statusCode 200", (done) => {
        const newTransaction = {
            date: "2022-01-10T22:00:00.000Z",
            name: "test adding new",
            description: "test123",
            amount: "10.00",
            category: "41224d776a326fb40f000001"
        }
        request(app)
            .post("/transactions/new")
            .send(newTransaction)
            .expect(200, done)
    })

    // it("Transaction details are stored correctly in database", (done) => {})
    // it("Removing Transaction works", (done) => {})
    // TODO: Implement constraint validation to API side
    // it("Test different Transactions constraints", (done) => {})
    // it("", (done) => {})
    // it("", (done) => {})
    // it("", (done) => {})
})
