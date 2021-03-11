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

// get all events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        return res.status(200).json({ success: true, data: events });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

// get specific event
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const savedEvent = await Event.findById(id);
        
        return res.status(200).json({ success: true, data: savedEvent });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

// The POST route: Check with front end team for any other additions/changes
router.post("/post", async (req, res) => {
    try {
        const { title, description, imgs, signup } = req.body;

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
            signup : signup,
            
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
            return res.status(404).json({ error: "Resource not found" });
        }
        
        savedEvent.remove();
        res.status(200).json({ msg: "Success" });

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
            return res.status(404).json({ error: "Resource not found" });
        }

        const { title, description, signup} = req.body;

        if (!title) {
            return res.status(400).json({ msg: "Title cannot be blank." });
        }

        retrievedEvent.title = title;
        retrievedEvent.description = description;
        retrievedEvent.signup = signup;

        const savedEvent = await retrievedEvent.save();
        res.send(savedEvent);
        
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})


// Image routes

router.post("/upload/:id", async (req, res) => {
    try {
        const {imgs} = req.body;

        if (!imgs) {
            return res.status(400).json({ msg: "No images provided." });
        }

        const id = req.params.id;

        const retrievedEvent = await Event.findById(id);

        if (!retrievedEvent) {
            return res.status(404).json({ error: "Resource not found" });
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

            img_array.push(image);
               
        };

        retrievedEvent.imgs = retrievedEvent.imgs.concat(img_array);

        const savedEvent = await retrievedEvent.save();
        res.send(savedEvent);

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})


// Sub Event Routes

router.post("/addsubevent/:id", async (req, res) => {
    try {
        const {title, description, signup} = req.body;

        if (!title) {
            return res.status(400).json({ msg: "No title provided." });
        }

        const id = req.params.id;

        const retrievedEvent = await Event.findById(id);

        if (!retrievedEvent) {
            return res.status(404).json({ error: "Resource not found" });
        }

        const subevent = {
            title,
            description,
            signup
        }
        
        retrievedEvent.subevents.push(subevent)

        const savedEvent = await retrievedEvent.save();
        res.send(savedEvent);

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.patch("/updatesubevent/:id/:idx", async (req, res) => {
    try {
        const {title, description, signup} = req.body;

        if (!title) {
            return res.status(400).json({ msg: "No title provided." });
        }

        const id = req.params.id;
        const index = req.params.idx;

        const retrievedEvent = await Event.findById(id);

        if (!retrievedEvent) {
            return res.status(404).json({ error: "Resource not found" });
        }

        const subevent = {
            title,
            description,
            signup
        }
        
        retrievedEvent.subevents[index] = subevent;

        const savedEvent = await retrievedEvent.save();
        res.send(savedEvent);

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;