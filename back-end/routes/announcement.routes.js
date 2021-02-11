// Model and express imports
const router = require('express').Router();
const Announcement = require('../models/announcement.model');


/***
 *  This file handles all the routes for the announcements.
 */

// The post route: Check with front end team for any other additions/changes
router.post("/announcements/post", async (req, res) => {
    try {
        const { title, body } = req.body;

        if (!title || !body) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }

        const announcement = new Announcement({
            title: title,
            body: body
        })

        const savedAnnouncement = await announcement.save();
        res.send(savedAnnouncement);

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})