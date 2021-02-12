// Model and express imports
const router = require('express').Router();
const Announcement = require('../db/models/announcement.model');

/***
 *  This file handles all the routes for the announcements.
 */

// The post route: Check with front end team for any other additions/changes
router.post("/post", async (req, res) => {
    try {
        const { title, body } = req.body;

        if (!title || !body) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }
        console.log("hello");
        const announcement = new Announcement({
            title: title,
            body: body
        });
        console.log("goodbye");

        const savedAnnouncement = await announcement.save();
        res.send(savedAnnouncement);

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// The delete route: Check with front end team for any other additions/changes
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

module.exports = router;