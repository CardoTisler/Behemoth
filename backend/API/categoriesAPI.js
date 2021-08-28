const express = require('express')
const router = express.Router();
const Category = require('../models/category')

//TODO: NEW route
router.get('/categories/new', function(req, res){
    console.log('categories api NEW GET')

    res.redirect('/categories')
})

//TODO: CREATE

//TODO: EDIT (?)

//TODO: UPDATE

//TODO: DESTROY

module.exports = router;