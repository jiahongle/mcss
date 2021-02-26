// Model and express imports
const router = require('express').Router();
const Event = require('../db/models/event.model');

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
        const { title, description, image, creator } = req.body;

        if (!title) {
            return res.status(400).json({ msg: "Title cannot be blank." });
        }

        const event = new Event({
            title: title,
            description: description,
            img: image,
            creator: creator
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