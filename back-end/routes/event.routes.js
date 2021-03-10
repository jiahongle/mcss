// Model and express imports
const router = require('express').Router();
const Event = require('../db/models/event.model');
const request = require("request");
const util = require('util')
const requestPromise = util.promisify(request);
// const ObjectId = require("mongodb").ObjectID;

/***
 *  This file handles all the routes for the events.
 */

// get events
router.get("/get", async (req, res) => {
    try {
        const events = await Event.find();
        return res.status(200).json({ success: true, data: events })
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
})


// The POST route: Check with front end team for any other additions/changes
router.post("/post", async (req, res) => {
    try {
        const { title, description, imgs, creator, signup } = req.body;
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

        const event = new Event({
            title: title,
            description: description,
            imgs: img_array,
            creator: creator,
            signup : signup
        });

        const savedEvent = await event.save();
        res.send(savedEvent);

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// The DELETE route: Check with front end team for any other additions/changes
router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const savedEvent = await Event.findById(id);

        // const savedImage = await Event.aggregate([{$unwind: "$imgs"}, {$match:{"imgs._id" : ObjectId(id)}}] );
        
        
        // console.log(savedImage);

        if (!savedEvent) {
            res.status(404).json({ error: "Resource not found" });
        }
        else {
            savedEvent.remove();
            res.status(200).json({ msg: "Success" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// The PATCH route: Check with front end team for any other additions/changes
router.patch("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const retrievedEvent = await Event.findById(id);

        if (!retrievedEvent) {
            res.status(404).json({ error: "Resource not found" });
        }
        else {
            const { title, description, image, creator } = req.body;
            if (!title) {
                return res.status(400).json({ msg: "Title and body cannot be blank." });
            }

            retrievedEvent.title = title;
            retrievedEvent.description = description;
            retrievedEvent.img = image;
            retrievedEvent.creator = creator;

            const savedEvent = await retrievedEvent.save();
            res.send(savedEvent);
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})


module.exports = router;