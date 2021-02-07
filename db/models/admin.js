/* admin model */
'use strict';

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Admin schema
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

// make a model using the admin schema
const Admin = mongoose.model('admin', AdminSchema)
module.exports = { Admin }
