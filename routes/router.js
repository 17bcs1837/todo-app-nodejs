const express = require('express');
const router = express.Router();

const db = require('../database/db');

router.get('/', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render("register"); 
})

module.exports = router;