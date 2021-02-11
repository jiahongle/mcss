/* Admin model */
'use strict';
const mongoose = require('mongoose')

// Created Admin schema: check with group if this is how they want it
const AdminSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true
	}, 
	password: {
		type: String,
		required: true,
		minlength: 5
	}
})

// Make a model using the admin schema
const Admin = mongoose.model('Admin', AdminSchema)
module.exports = { Admin }
