const express = require('express');
const userRouter = express.Router();

// JSON Web Token
const jwt = require('jsonwebtoken');
const TOKEN = 'A4S5GRVP5SD4';

// Hash Password
const bcrypt = require('bcrypt');

// Database
const db = require('../database/db');
const { Query } = require('pg');

userRouter.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const query = 'SELECT * FROM USERS WHERE email = $1';
    db.query(query, [email], async (err, dbres) => {
        if(dbres.rows.length === 0) {
            res.render("error", {error: "No such user exists."});
        }

        if(dbres.rows.length > 0) {
            const correctPassword = await bcrypt.compare(password, dbres.rows[0].password);
            if(correctPassword) {

                // JWT Authentication
                const emailAuth = { email: email };
                const ACCESS_TOKEN = jwt.sign(emailAuth, TOKEN);
                
                // Set Cookie
                res.cookie('token', ACCESS_TOKEN);

                // Redirect to Dashboard
                res.redirect("/user/dashboard");
            } else {
                res.render("error", {error: "Invalid Credentials"});
            }
        }
    })
})

userRouter.post('/register', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if(password !== confirmPassword) {
        res.render("error", {
            error: "Password Does Not Match"
        })
    }
    const query = 'SELECT * FROM USERS WHERE email = $1';

    db.query(query, [email], async (err, dbres) => {
        if(dbres.rows.length > 0) {
            res.render("error", {error: "Email Already Exists"});
        }

        if(dbres.rows.length === 0) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const query = 'INSERT INTO USERS VALUES ($1, $2, $3)';
            db.query(query, [username, email, hashedPassword], (err, dbres) => {
                res.render("login", {msg: "Succesfully Registered"});
            })
        }
    })
})

userRouter.get('/dashboard', (req, res) => {
    // JWT Verification
    let email;
    const user = jwt.verify(req.cookies.token, TOKEN, (err, user) => {
        if(err) res.render("error", {error: "Invalid JWT Signature. Please login before accessing this page."});
        email = user.email;
    });

    const query = 'SELECT todo, id FROM todos WHERE author = $1';
    db.query(query, [email], (err, dbres) => {
        const data = dbres.rows;
        res.render("dashboard", {data: data, setCookie: req.cookies.token});
    })
})

userRouter.post('/dashboard/todo', (req, res) => {
    // JWT Verification
    let email;
    jwt.verify(req.cookies.token, TOKEN, (err, user) => {
        if(err) res.render("error", {error: "Invalid JWT Signature. Please login before accessing this page."});
        email = user.email;
    });

    // Adding "todo" to database
    const todo = req.body.todo;
    const query = 'INSERT INTO todos VALUES ($1, $2)';
    db.query(query, [email, todo], async (err, dbres) => {
        await dbres;
        res.redirect("/user/dashboard");
    })    
})

userRouter.post('/dashboard/todo/done', (req, res) => {
    const done = parseInt(req.body.todoDone);
    
    // JWT
    jwt.verify(req.cookies.token, TOKEN, (err, user) => {
        if(err) res.render("error", {error: "Invalid JWT Signature. Please login before accessing this page."});
        
        const query = 'DELETE FROM todos WHERE id = $1 AND author = $2';
        db.query(query, [done, user.email]);

        res.redirect("/user/dashboard");
    })
})

userRouter.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect("/");  
})

module.exports = userRouter;