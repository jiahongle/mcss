/* Announcement mongoose model */
'use strict';
const mongoose = require('mongoose')

const AnnouncementSchema = mongoose.model('announcement', {
	title: {
		type: String,
		required: true,
		trim: true
	},
	body: {
		type: String,
		required: true,
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

const announcement = mongoose.model('announcement', AnnouncementSchema)
module.exports = { announcement }