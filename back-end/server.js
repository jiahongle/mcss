/* server.js for react-express-authentication */
"use strict";
const log = console.log;

const express = require("express");

// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");

// to validate object IDs
const { ObjectID } = require("mongodb");

//enable cors
const cors = require('cors')

app.use(cors())

app.use(express.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(express.urlencoded({ extended: true }));

/*** Session handling **************************************/
// Create a session cookie
app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        }
    })
);

// Router Imports
app.use('/announcements', require('./routes/announcement.routes'));
app.use('/admins', require('./routes/admin.routes'));

// Start the express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
