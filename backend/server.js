// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const categoriesAPI = require('./API/categoriesAPI')
const transactionsAPI = require('./API/transactionsAPI')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://127.0.0.1:27017/behemoth', {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => { 
        console.log('Connected to MongoDB on port ', 27017)
    }).catch(err => console.log(err))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
app.use(categoriesAPI)
app.use(transactionsAPI)




app.listen(3001, process.env.IP, function(){
    console.log('Server running on port', 3001)
})
