/* Announcement mongoose model */
'use strict';
const mongoose = require('mongoose')

const EventSchema = new mongoose.Scheme ({
	title: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
  	postedAt: {
		type: Date,
		required: true
    },
  	creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	// TODO: Complete when wireframe is done
	img: {
		// TODO: decide how to 
	}
})

const Event = mongoose.model('Event', EventSchema)
module.exports = { Event }