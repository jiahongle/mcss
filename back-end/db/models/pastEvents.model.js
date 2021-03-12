/* past Event mongoose model */
'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PastEventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    images: [{
        deletehash: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    }],
    year: {
        type: Number
    }
}, {
    timestamps: true
})


const PastEvent = mongoose.model('PastEvent', PastEventSchema)
module.exports = PastEvent;