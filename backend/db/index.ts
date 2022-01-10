const mongoose = require("mongoose");
const DB_URL = process.env.NODE_ENV === "test" ? process.env.TEST_DB_URL : process.env.DB_URL;
console.log(process.env.NODE_ENV);
const connect = async () => {
    console.log(`Connecting to ${process.env.NODE_ENV} database`);
    console.log(DB_URL);
    await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true})
        .then(() => {
            console.log(`Successfully connected to MongoDB!`)
        }).catch((err: any) => console.error(err.message))
}

const disconnect = async () => {
    console.log(`Disconnecting from ${process.env.NODE_ENV} database`);
    return await mongoose.disconnect
}
module.exports = {connect, disconnect}
