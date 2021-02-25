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

module.exports = router;