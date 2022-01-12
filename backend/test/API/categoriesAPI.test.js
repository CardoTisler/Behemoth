const app = require("app.ts");
const connection = require("db/index");
const request = require("supertest");
const expect = require("chai").expect
const PORT = process.env.DEV_PORT || 3001;
let server = null;

describe("Category Tests", () => {
    before("Connect to database", (done) => {
        connection.connect()
            .then(() => {
                server = app.listen(PORT)
            }).then(() => done())
    })
    beforeEach("Clear Categories collection of existing data", (done) => {
        request(app)
            .delete("/categories/deleteAll")
            .expect(200, done)
    })
    after("Disconnect from database", async () => {
        await request(app)
            .delete("/categories/deleteAll")
            .expect(200)
        await connection.disconnect()
        await server.close()
    })

    it("Adding Income category returns statusCode 200", (done) => {
        const newCategory = {isIncomeCategory: true, name: "Test123"};
        request(app)
            .post("/categories/new")
            .send(newCategory)
            .expect(200, done);
    })

    it("Expense category's details are stored correctly in db", (done) => {
        const newCategory = {isIncomeCategory: false, name: "Expense123", budget: 150}
        request(app)
            .post("/categories/new")
            .send(newCategory)
            .expect(200)
            .then(() => {
                request(app)
                    .get("/categories/show")
                    .expect(resp => {
                        expect(resp.body.expenseCategories[0].budget).to.equal(150)
                    })
                    .expect(200, done)
            })
    })

    it("Removing category by ID works", (done) => {
        const newCategory = {isIncomeCategory: true, name: "TestCategoryRemoval"}
        request(app)
            .post("/categories/new")
            .send(newCategory)
            .expect(200)
            .then(() => {
                request(app)
                    .get("/categories/show")
                    .expect(200)
                    .then((resp) => {
                        const {_id} = resp.body.incomeCategories[0]
                        request(app)
                            .delete(`/categories/delete/${_id}`)
                            .expect(200, done)
                    })
            })
    })

    it("Can not add category with budget as a negative number", (done) => {
        const newCategory = {isIncomeCategory: false, name: "testBudgetLimit", budget: -1}
        request(app)
            .post("/categories/new")
            .send(newCategory)
            .expect(400)
            .expect({statusText: "Budget validation failed."}, done)
    })

    it("Can not add category with empty name field", (done) => {
        const newCategory = {isIncomeCategory: true, name: ""}
        request(app)
            .post("/categories/new")
            .send(newCategory)
            .expect(400)
            .expect({statusText: "Name validation failed."}, done)
    })

    it("Can not add category with name field over 20 chars", (done) => {
        const newCategory = {isIncomeCategory: true, name: "testNameLengthConstraint"}
        request(app)
            .post("/categories/new")
            .send(newCategory)
            .expect(400)
            .expect({statusText: "Name validation failed."}, done)
    })
})
