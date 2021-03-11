
const router = require('express').Router();
const PastEvent = require('../db/models/pastEvents.model');
const request = require("request");
const util = require('util');
const multer = require('multer');

var upload = multer({ dest: 'uploads/' })



// The POST route: Check with front end team for any other additions/changes
router.post("/post", upload.single('file'), async (req, res) => {
    try {
        const { imgs, eventTitle, year } = req.body;
        console.log(req.file);
        console.log(imgs);
        console.log(eventTitle);
        console.log(year);
        if (!title) {
            return res.status(400).json({ msg: "Title cannot be blank." });
        }

        var img_array = []

        for (const img of imgs) {

            var options = {
                'method': 'POST',
                'url': 'https://api.imgur.com/3/image',
                'headers': {
                    'Authorization': 'Client-ID 23cded91461ac64'
                },
                formData: {
                    'image': img
                }
            };

            const response = await requestPromise(options);

            const jsonBody = JSON.parse(response.body);

            const deletehash = jsonBody.data.deletehash;
            const link = jsonBody.data.link;

            const image = {
                deletehash,
                link
            }

            console.log(image);
            img_array.push(image);

        };

        // const event = new Event({
        //     title: title,
        //     description: description,
        //     imgs: img_array,
        //     creator: creator,
        //     signup: signup
        // });

        // const savedEvent = await event.save();
        // res.send(savedEvent);

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})
module.exports = router;