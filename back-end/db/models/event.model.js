/* Event mongoose model */
'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
	title: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	creator: {
		type: String,
		required: true
	},
	imgs: [{
		type: String,
		required: false
	}],
	signup: {
		type: String,
		required: false
	},
	description: {
		type: String,
		required: false
	}
}, {
	timestamps: true
})

const Event = mongoose.model('Event', EventSchema)
module.exports = Event;