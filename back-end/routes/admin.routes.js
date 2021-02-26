// Model and express imports
const router = require('express').Router();
const Admin = require('../db/models/admin.model');
// Set up a POST route to create a admin user
router.post("/register", (req, res) => {

    // Create a new admin
    const admin = new Admin({
        username: req.body.username,
        password: req.body.password
    });
    
    // Save the user
    admin.save().then(
        admin => {
            res.send(admin);
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    );

});

// A route to login and create a session
router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Use the static method on the Patient model to find a patient
    // by their email and password
    Admin.findByUserNamePassword(username, password)
        .then(admin => {
            // Add the admin's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.admin = admin._id;
            req.session.username = admin.username;
            res.send({ currentUser: admin.username });
        })
        .catch(error => {
            error  === 'Username Not Found' ? res.status(400).send() : res.status(406).send() 
        });
});

module.exports = router;