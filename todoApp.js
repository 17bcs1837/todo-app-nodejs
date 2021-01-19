const cookieParser = require('cookie-parser');
const express = require('express')
const path = require('path');
const app = express()

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({'extended':true}));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');


// Router
const router = require('./routes/router');
const userRouter = require('./routes/userRouter');

app.use('/', router);
app.use('/user', userRouter);

app.listen(process.env.PORT || 5000 , () => {
    console.log("Listening");
});
