
const router = require('express').Router();
const PastEvent = require('../db/models/pastEvents.model');
const request = require("request");
const util = require('util')
const requestPromise = util.promisify(request);

router.get("/get", async (req, res) => {
    try {
        const pastEvents = await PastEvent.find();

        lst = {};

        for (var i = 0; i < pastEvents.length; i++) {
            if (lst.hasOwnProperty(pastEvents[i].year)) {
                lst[pastEvents[i].year].push(pastEvents[i])
            } else {
                lst[pastEvents[i].year] = [pastEvents[i]]
            }

        }
        return res.status(200).json({ success: true, data: lst })
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

// The POST route: Check with front end team for any other additions/changes
router.post('/postFile', async (req, res) => {

    try {
        const { title, year } = req.body;
        const file = req.files.file;
        var imgs = [];
        if (!Array.isArray(file)) {
            imgs.push(file)
        } else {
            imgs = file
        }

        var img_array = [];
        for (const img of imgs) {

            var options = {
                'method': 'POST',
                'url': 'https://api.imgur.com/3/image',
                'headers': {
                    'Authorization': 'Client-ID 23cded91461ac64'
                },
                formData: {
                    'image': img.data
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


        const pastEvent = new PastEvent({
            title: title,
            year: year,
            images: img_array
        });

        const savedPastEvent = await pastEvent.save();
        res.send(savedPastEvent);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
});

router.post('/addFiles', async (req, res) => {
    try {

        const { _id } = req.body;
        const file = req.files.file;
        const retrievedPastEvent = await PastEvent.findById(_id);
        console.log(file)
        var options = {
            'method': 'POST',
            'url': 'https://api.imgur.com/3/image',
            'headers': {
                'Authorization': 'Client-ID 23cded91461ac64'
            },
            formData: {
                'image': file.data
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


        retrievedPastEvent['images'].push(image);
        const savedPastEvent = await retrievedPastEvent.save();
        res.send(savedPastEvent)
    } catch (error) {
        console.log(error)
    }
})
router.post('/postInfo', async (req, res) => {
    console.log(req.body)
    try {
        const { title, year } = req.body;

        const pastEvent = new PastEvent({
            title: title,
            year: year,
            images: []
        });

        const savedPastEvent = await pastEvent.save();
        res.send(savedPastEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/delete", async (req, res) => {
    try {
        const { deletehash, _id } = req.body;
        console.log(req.body)
        const savedPastEvent = await PastEvent.findById(_id);

        if (!savedPastEvent) {
            res.status(404).json({ error: "Resource not found" });
        }
        else {
            for (var i = 0; i < savedPastEvent["images"].length; i++) {
                if (savedPastEvent["images"][i]["deleteHash"] == deletehash) {
                    savedPastEvent["images"].pop(i);
                    await savedPastEvent.save()
                    res.status(200).json({ msg: "Success" });
                }
            }
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;