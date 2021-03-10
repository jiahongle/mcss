/* past Event mongoose model */
'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    eventTitle: {
        Type: String,
        required: true
    },
    images: [{
        deletehash: {
            Type: String,
            required: true
        },
        link: {
            Type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})


const Event = mongoose.model('Event', EventSchema)
module.exports = Event;