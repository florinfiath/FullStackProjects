var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const robotsRouter = require('./routes/robots');


//CORS Security for the clients website to disable same/-origin-Security 
// import of the security middleware 
const { setCors } = require('./middleware/security')


var app = express();

app.use(logger('dev'));

//!SET UP THE LOWDB DATABASE

 // initialize the adapter to the mock db file
const adapter = new FileSync('data/db.json');
// initialize mock db using lowdb
const db = low(adapter);

// add default entries to the DATABASE
db.defaults({
  robots: []
}).write();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// SET CORS to omit security errors
app.use(setCors);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/robots', robotsRouter);

//ERROR Handling 
app.use((err,req, res, next) => {
    //respond to the requester with the error message
    // set response status to 500 
    res.status(500).send(
        {
            error: {
                message: err.message
            }
        })
});

module.exports = app;
