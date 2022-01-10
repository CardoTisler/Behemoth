const request = require("supertest");
const should = require("should")
const chai = require("chai")
const expect = chai.expect;
const assert = chai.assert;
const app = require("../app.ts")
const connection = require("../db/index")
const PORT = process.env.DEV_PORT || 3001;
let server = null;

// TODO: Split everything into different files

describe("Test database connectivity", () => {
    before("Connect to database", (done) => {
        connection.connect()
            .then(() => {
                server = app.listen(PORT, () => {
                    console.log(`Listening on port ${PORT}`)
                })
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
        request(app).get("/transactions/show").expect(400, done)
    })
})

describe("Category Tests", () => {
    before("Connect to database", (done) => {
        connection.connect()
            .then(() => {
                server = app.listen(PORT, () => {
                    console.log(`Listening on port ${PORT}`)
                })
            }).then(() => done())
    })
    beforeEach("Clear Categories collection of existing data", (done) => {
        request(app)
            .delete("/categories/deleteAll")
            .expect(200, done)
    })
    after("Disconnect from database", (done) => {
        connection.disconnect()
        server.close()
        done()
    })

    it("Adding Income category returns statusCode 200", (done) => {
        const newCategory = {isIncomeCategory: true, name: "Test123", budget: 100};
        request(app)
            .post("/categories/new")
            .send(newCategory)
            .expect(200, done);
    })

    // TODO: Test adding category
    // it("Expense category's details are stored correctly in db", (done) => {
    //
    // })

    // TODO: Test removing category, expect category count 0 after removal
    // it("Removing category by ID works", (done) => {
    //
    // })

    // TODO: Add API-side data validation and then add tests to check those constraints
    // like budget shouldnt be a negative number and so on.
    // it("Can not add category with budget as a negative number", (done) => {
    //
    // })

    // TODO: Implement name length check to API and create test, expect statuscode 400
    // it("Can not add category with empty name field", (done) => {
    //
    // })

    // TODO: Implement API-side enum check for category type, expect statuscode 400
    // it("Can not add category with type that isn't [`Income`, `Expense`, `NONE`]", (done) => {
    //
    // })
})

// describe("Transaction Tests", () => {
//     before("Connect to database", (done) => {
//         connection.connect()
//             .then(() => {
//                 app.listen(PORT, () => {
//                     console.log(`Listening on port ${PORT}`)
//                 })
//             }).then(() => done())
//     })
//
//     after("Disconnect from database", (done) => {
//         connection.disconnect().then(() => done());
//         console.log("Disconnected from database.")
//     })
//
//     it("Transactions have content", (done) => {
//         request(app).get("http://localhost:3001/transactions/show", async (err, res, body) => {
//             var _body = {};
//             try {
//                 _body = JSON.parse(body);
//             } catch (e) {
//                 _body = {};
//             }
//             expect(res.statusCode).to.equal(200);
//             expect(_body.transactionsList).to.have.lengthOf.greaterThan(0);
//             done();
//         });
//     })
// })
