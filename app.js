const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const pug = require('pug');
const router = express.Router();


const logInRouter = require('./routes/logIn');
const registerRouter = require('./routes/register');
// const logInRouter = require('./routes/logIn');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes

app.use('/register', registerRouter);
// register method routing
app.use('/login', logInRouter);
app.use('/refresh', logInRouter);
// log in method routing

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'
        ? err
        : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000);

module.exports = [ app, router ];
