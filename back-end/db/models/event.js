/* Announcement mongoose model */
'use strict';
const mongoose = require('mongoose')

const EventSchema = mongoose.model('event', {
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

const event = mongoose.model('announcement', EventSchema)
module.exports = { event }