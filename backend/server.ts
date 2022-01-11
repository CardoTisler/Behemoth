export {}
const app = require("./app")
const {connect} = require("./db/index")

const PORT = process.env.DEV_PORT || 3001;
connect().then(() => {
    app.listen(PORT, () => {
        console.log("Successfully connected to MongoDB")
        console.log(`Server running on port ${PORT}`)
    })
})
