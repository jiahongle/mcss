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

        const { email } = req.body;

        var options = {
            'method': 'POST',
            'url': 'https://' + server + '.api.mailchimp.com/3.0/lists/' + listId + '/members/',
            'content-type': 'application/json;charset=utf-8',
            'headers': {
                'Authorization': 'Basic ' + Buffer.from('any:' + apiKey ).toString('base64')
            },
            json: {
                'email_address': email,
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


// Route for sending emails to the mailing list
router.post('/send', async function (req, res) {

    try {
        const { subject, title, person_name, from_address, message } = req.body;

        console.log(from_address);

        var emailCreateOptions = {
            'method': 'POST',
            'url': 'https://' + server + '.api.mailchimp.com/3.0/campaigns',
            'content-type': 'application/json;charset=utf-8',
            'headers': {
                'Authorization': 'Basic ' + Buffer.from('any:' + apiKey ).toString('base64')
            },
            json: {
                "type": "plaintext",
                "recipients": {
                    "list_id": listId
                },
                "settings": {
                    "subject_line": subject,
                    "title": title,
                    "from_name": person_name,
                    "reply_to": from_address

                }
            }
        };

        const emailCreateResponse = await requestPromise(emailCreateOptions);

        if (emailCreateResponse.statusCode > 300) {
            return res.status(400).json({ error: "Email was not created." });
        }

        const campaignId = emailCreateResponse.body.id;

        var setMessageOptions = {
            'method': 'PUT',
            'url': 'https://' + server + '.api.mailchimp.com/3.0/campaigns/' + campaignId + '/content',
            'content-type': 'application/json;charset=utf-8',
            'headers': {
                'Authorization': 'Basic ' + Buffer.from('any:' + apiKey ).toString('base64')
            },
            json: {
                "plaintext": message
            }
        };

        const setMessageResponse = await requestPromise(setMessageOptions);

        if (setMessageResponse.statusCode > 300) {
            return res.status(400).json({ error: "Email Body was not set properly." });
        }

        var sendMessageOptions = {
            'method': 'POST',
            'url': 'https://' + server + '.api.mailchimp.com/3.0/campaigns/' + campaignId + '/actions/send',
            'content-type': 'application/json;charset=utf-8',
            'headers': {
                'Authorization': 'Basic ' + Buffer.from('any:' + apiKey ).toString('base64')
            }
        };

        const sendMessageResponse = await requestPromise(sendMessageOptions);
        console.log(sendMessageResponse);
        if (sendMessageResponse.statusCode > 300) {
            return res.status(400).json({ error: "Sending email was unsuccessfull." });
        }

        return res.status(200).json("Email sent successfully!");

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
        
});

module.exports = router;