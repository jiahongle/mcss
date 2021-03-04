// Model and express imports
const router = require('express').Router();
const Admin = require('../db/models/admin.model');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;

passport.use(new JWTStrategy({
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: "thedays",
},
    (jwtPayload, done) => {
        if (Date.now() > jwtPayload.expires) {
            return done('jwt expired');
        }

        return done(null, jwtPayload);
    }
));

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
    console.log(req.session);
    Admin.findByUserNamePassword(username, password)
        .then(admin => {
            // Add the admin's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            const payload = {
                username: admin.username,
                expires: Date.now() + 480000,
            };


            /** generate a signed json web token and return it in the response */
            const token = jwt.sign(JSON.stringify(payload), "thedays");

            /** assign our jwt to the cookie */
            res.cookie('jwt', token, { httpOnly: true, secure: false });
            res.status(200).send({ username: admin.username });

        })
        .catch(error => {
            error === 'Username Not Found' ? res.status(400).send() : res.status(406).send()
        });
});

router.post("/logout", (req, res) => {
    req.session.reset();
    res.send(200);
})

router.get('/protected',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { user } = req;
        console.log("hello")
        res.status(200).send({ user });
    });

module.exports = router;