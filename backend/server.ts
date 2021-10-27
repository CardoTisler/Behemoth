require('dotenv').config()
let mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const categoriesAPI = require('./API/categoriesAPI.ts')
const transactionsAPI = require('./API/transactionsAPI.ts')

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => { 
        console.log(`Successfully connected to MongoDB!`)
    }).catch((err: any) => console.error(err.message))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
app.use(categoriesAPI)
app.use(transactionsAPI)
  
//catch errors from middleware
app.use((err: any, req:any, res:any, next:any) => {
    console.error(err.stack)
    res.json({status: 500, statusText: 'Middleware exception caught: '+err.message})
})

app.listen(process.env.DEV_PORT, process.env.IP, function(){
    console.log('Server running on port', process.env.DEV_PORT)
})
