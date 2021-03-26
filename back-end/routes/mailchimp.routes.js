// Model and express imports
const router = require('express').Router();
const mailchimpInfo = require('../MailChimpInfo');
const apiKey = mailchimpInfo.apiKey;
const server = mailchimpInfo.server;
const listId = mailchimpInfo.listId;

const request = require("request");
const util = require('util')
const requestPromise = util.promisify(request);

// Route for registering a user to the mailing list
router.post('/signup', async function (req, res) {

    try {
        var options = {
            'method': 'POST',
            'url': 'https://' + server + '.api.mailchimp.com/3.0/lists/' + listId + '/members/',
            'content-type': 'application/json;charset=utf-8',
            'headers': {
                'Authorization': 'Basic ' + Buffer.from('any:' + apiKey ).toString('base64')
            },
            json: {
                'email_address': req.body.email,
                'status': 'subscribed'  
            }
        };

        const response = await requestPromise(options);
        if (response.statusCode < 300) {
            res.send('Signed Up!');
        } else if (response.body.status == 400 && response.body.title == "Member Exists") {
            res.status(400).json({ error: "Already Signed Up!" });
        } else {
            res.status(400).json({ error: "Signup Failed." });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
        
});

module.exports = router;