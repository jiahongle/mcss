
const router = require('express').Router();
const PastEvent = require('../db/models/pastEvents.model');
const request = require("request");
const util = require('util')
const requestPromise = util.promisify(request);

router.get("/get", async (req, res) => {
    try {
        const pastEvents = await PastEvent.find();

        lst = {};
        
        for (var i=0; i<pastEvents.length; i++){
            if (lst.hasOwnProperty(pastEvents[i].year)){
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

// router.post("/post", upload.single('file'), async (req, res) => {
//     try {
//         console.log(res.body)
//         console.log(res.file)
//         // const { imgs, eventTitle, year } = req.body;
//         // console.log(req.body);
//         // console.log(imgs);
//         // console.log(eventTitle);
//         // console.log(year);
//         // if (!title) {
//         //     return res.status(400).json({ msg: "Title cannot be blank." });
//         // }


//         var img_array = []

//         // for (const img of imgs) {

//         //     var options = {
//         //         'method': 'POST',
//         //         'url': 'https://api.imgur.com/3/image',
//         //         'headers': {
//         //             'Authorization': 'Client-ID 23cded91461ac64'
//         //         },
//         //         formData: {
//         //             'image': img
//         //         }
//         //     };

//         //     const response = await requestPromise(options);

//         //     const jsonBody = JSON.parse(response.body);

//         //     const deletehash = jsonBody.data.deletehash;
//         //     const link = jsonBody.data.link;

//         //     const image = {
//         //         deletehash,
//         //         link
//         //     }

//         //     console.log(image);
//         //     img_array.push(image);

//         // };

//         // const event = new Event({
//         //     title: title,
//         //     description: description,
//         //     imgs: img_array,
//         //     creator: creator,
//         //     signup: signup
//         // });

//         // const savedEvent = await event.save();
//         // res.send(savedEvent);

//     }
//     catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// })
module.exports = router;