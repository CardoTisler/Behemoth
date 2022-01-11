const mongoose = require("mongoose");
const DB_URL = process.env.NODE_ENV === "test" ? process.env.TEST_DB_URL : process.env.DB_URL;

const connect = async () => {
    await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true})
        .catch((err: any) => console.error(err.message))
}

const disconnect = async () => {
    return await mongoose.disconnect
}
module.exports = {connect, disconnect}
