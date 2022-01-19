export {}
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const categoriesAPI = require('./API/categoriesAPI.ts')
const transactionsAPI = require('./API/transactionsAPI.ts')
const usersAPI = require("./API/usersAPI.ts")

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
app.use(categoriesAPI)
app.use(transactionsAPI)
app.use(usersAPI)
//catch errors from middleware
app.use((err:any, req:any, res:any, next:any) => {
    console.error(err.stack)
    res.status(500).send({status: 500, statusText: 'Middleware exception caught: '+err.message})
})

module.exports = app;
