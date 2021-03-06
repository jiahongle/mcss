/* Announcement mongoose model */
'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Might add custom id, depends on frontend implementation

// Created Announcement schema: check with group if this is how they want it
const AnnouncementSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	body: {
		type: String,
		// required: true,
		trim: true
	},
	// creator: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	required: true
  	// },
},
{
	timestamps: true
})

// Make a model using the announcement schema
const Announcement = mongoose.model('Announcement', AnnouncementSchema);
module.exports = Announcement;