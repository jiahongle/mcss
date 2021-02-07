/* server.js for react-express-authentication */
"use strict";
const log = console.log;

const express = require("express");

// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");

// import the mongoose models
const { Announcement } = require("./db/models/announcement");
const { Admin } = require("./db/models/admin");

// to validate object IDs
const { ObjectID } = require("mongodb");

app.use(express.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(express.urlencoded({ extended: true }));

/*** Session handling **************************************/
// Create a session cookie
// app.use(
//     session({
//         secret: "oursecret",
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             expires: 60000,
//             httpOnly: true
//         }
//     })
// );

// Start the express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});