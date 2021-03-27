/* server.js for react-express-authentication */
"use strict";

const express = require("express");
const session = require("express-session");
const { mongoose } = require("./db/mongoose");
const { ObjectID } = require("mongodb");
const cors = require('cors')
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');
const fileupload = require('express-fileupload')

const app = express();

const log = console.log;

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000', // your_frontend_domain, it's an example
    })
);
app.use((req, res, next) => {
    console.log(req.path);

    // this will log a cookie when several 
    // requests are sent through the browser 
    // but 'undefined' through `fetch`
    console.log('cookie in header: ', req.headers.cookie);

    next();
});
app.use(cookieParser());
app.use(express.json());
app.use(fileupload())



app.use(express.urlencoded({ extended: true }));
/*** Session handling **************************************/
// Creates a session cookie
app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true,
            secure: false
        }
    })
);

// Router Imports
app.use('/announcements', require('./routes/announcement.routes'));
app.use('/admins', require('./routes/admin.routes'));
app.use('/events', require('./routes/event.routes'));
app.use('/mailchimp', require('./routes/mailchimp.routes'));
app.use('/pastevents', require('./routes/pastEvent.routes'));
app.get('/checkToken', withAuth, function (req, res) {
    res.sendStatus(200);
});


// Start the express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
