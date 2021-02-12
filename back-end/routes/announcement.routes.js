// Model and express imports
const router = require('express').Router();
const Announcement = require('../db/models/announcement.model');

/***
 *  This file handles all the routes for the announcements.
 */

// get announcements
router.get("/get", async (req, res) => {
    try {
        const announcements = await Announcement.find();
        return res.status(200).json({ success: true, data: announcements })
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
})


// The POST route: Check with front end team for any other additions/changes
router.post("/post", async (req, res) => {
    try {
        const { title, body } = req.body;
        console.log(req.body);
        if (!title || !body) {
            return res.status(400).json({ msg: "Title and body cannot be blank." });
        }

        const announcement = new Announcement({
            title: title,
            body: body
        });

        const savedAnnouncement = await announcement.save();
        res.send(savedAnnouncement);

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// The DELETE route: Check with front end team for any other additions/changes
router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const savedAnnouncement = await Announcement.findById(id);

        if (!savedAnnouncement) {
            res.status(404).json({ error: "Resource not found" });
        }
        else {
            savedAnnouncement.remove();
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

        const retrievedAnnouncement = await Announcement.findById(id);

        if (!retrievedAnnouncement) {
            res.status(404).json({ error: "Resource not found" });
        }
        else {
            const { title, body } = req.body;
            if (!title || !body) {
                return res.status(400).json({ msg: "Title and body cannot be blank." });
            }

            retrievedAnnouncement.title = title;
            retrievedAnnouncement.body = body;

            const savedAnnouncement = await retrievedAnnouncement.save();
            res.send(savedAnnouncement);
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})


module.exports = router;