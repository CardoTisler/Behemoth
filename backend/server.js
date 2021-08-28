const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const app = express()
const categoriesAPI = require('./API/categoriesAPI')
const transactionsAPI = require('./API/transactionsAPI')

function main(){
    connectDatabase('mongodb://127.0.0.1:27017', 'behemoth')
    
}

function connectDatabase(url, dbName) {
    MongoClient.connect(url, { useNewUrlParser: true}, (err, client) => {
        if (err) return console.log(err)

        db = client.db(dbName)
        console.log(`Connected MongoDB: ${url}`)
        console.log(`Database: ${dbName}`)
    })
}

app.use(categoriesAPI)
app.use(transactionsAPI)




main();
app.listen(3000, process.env.IP, function(){
    console.log('Server running on port', 3000)
})
