const app = require("app.ts");
const connection = require("db/index");
const request = require("supertest");
const { expect } = require("chai")
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

    it("Transaction details are stored correctly in database", (done) => {
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
            .expect(200)
            .then(() => {
                request(app)
                    .get("/transactions/show")
                .expect((res) => {
                        const {date, name, description, amount} = res.body.transactionsList[0]
                        expect(date).to.equal("2022-01-10T22:00:00.000Z")
                        expect(name).to.equal("test adding new")
                        expect(description).to.equal("test123")
                        expect(amount).to.equal(10)
                    })
                    .expect(200, done)
            })
    })
    it("Removing Transaction works", (done) => {
        const newTransaction = {
            date: "2022-01-10T22:00:00.000Z",
            name: "test removing",
            description: "testRemove",
            amount: "5.12",
            category: "41224d776a326fb40f123451"
        }
        request(app)
            .post("/transactions/new")
            .send(newTransaction)
            .expect(200)
            .then(() => {
                request(app)
                    .get("/transactions/show")
                    .expect(200)
                    .then(res => {
                        const transactionId = res.body.transactionsList[0]._id;
                        request(app)
                            .delete(`/transactions/delete/${transactionId}`)
                            .expect(200, done)
                    })
            })
    })

    it("Can not add transaction with empty name field", (done) => {
        const newTransaction = {
            date: "2022-01-10T22:00:00.000Z",
            name: "",
            description: "test min name length",
            amount: "10.00",
            category: "41224d776a326fb40f000001"
        }
        request(app)
            .post("/transactions/new")
            .send(newTransaction)
            .expect(400, done)
    })

    it("Can not add transaction with name over 60 chars", (done) => {
        const newTransaction = {
            date: "2022-01-10T22:00:00.000Z",
            name: "1234567890123456789012345678901234567890123456789012345678901",
            description: "test max name length",
            amount: "10.00",
            category: "41224d776a326fb40f000001"
        }
        request(app)
            .post("/transactions/new")
            .send(newTransaction)
            .expect(400, done)
    })
    it("Can not add transaction with invalid date string", (done) => {
        const newTransaction = {
            date: "12123 2033",
            name: "test123",
            description: "test date format",
            amount: "10.00",
            category: "41224d776a326fb40f000001"
        }
        request(app)
            .post("/transactions/new")
            .send(newTransaction)
            .expect(400, done)
    })
    it("Can not add transaction with no description", (done) => {
        const newTransaction = {
            date: "12/12-2022 10:01-00",
            name: "test desc min",
            description: "",
            amount: "10.00",
            category: "41224d776a326fb40f000001"
        }
        request(app)
            .post("/transactions/new")
            .send(newTransaction)
            .expect(400, done)
    })
    it("Can not add transaction with description over 60 chars", (done) => {
        const newTransaction = {
            date: "2022-01-10T22:00:00.000Z",
            name: "test desc max",
            description: "1234567890123456789012345678901234567890123456789012345678901",
            amount: "10.00",
            category: "41224d776a326fb40f000001"
        }
        request(app)
            .post("/transactions/new")
            .send(newTransaction)
            .expect(400, done)
    })
    it("Can not add transaction with amount that has over 2 decimal points", (done) => {
        const newTransaction = {
            date: "2022-01-10T22:00:00.000Z",
            name: "amounttest",
            description: "test amount decimals",
            amount: "10.234",
            category: "41224d776a326fb40f000001"
        }
        request(app)
            .post("/transactions/new")
            .send(newTransaction)
            .expect(400, done)
    })
    it("Can not add transaction with negative amount", (done) => {
        const newTransaction = {
            date: "2022-01-10T22:00:00.000Z",
            name: "amounttest",
            description: "test negative amount",
            amount: "-10.00",
            category: "41224d776a326fb40f000001"
        }
        request(app)
            .post("/transactions/new")
            .send(newTransaction)
            .expect(400, done)
    })
    it("Category ID must match MongoDB-s requirements", (done) => {
        const newTransaction = {
            date: "2022-01-10T22:00:00.000Z",
            name: "category ID test",
            description: "format test",
            amount: "-10.00",
            category: "122njilp2123l"
        }
        request(app)
            .post("/transactions/new")
            .send(newTransaction)
            .expect(400, done)
    })
})
