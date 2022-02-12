export {}
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const categoriesAPI = require('./API/categoriesAPI')
const transactionsAPI = require('./API/transactionsAPI')
const usersAPI = require("./API/usersAPI")

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"));
}
app.use(cors())
app.use(categoriesAPI)
app.use(transactionsAPI)
app.use(usersAPI)
//catch errors from middleware
app.use((err:any, req:any, res:any, next:any) => {
    console.error(err.stack)
    res.status(500).send({statusText: 'Middleware exception caught.', error: err.message})
})

module.exports = app;