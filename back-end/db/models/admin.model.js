/* Admin model */
'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// This function will run immediately prior to saving the document
// in the database.
AdminSchema.pre('save', function(next) {
	const admin = this; // binds this to admin document instance

	// checks to ensure we don't hash password more than once
	if (admin.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(admin.password, salt, (err, hash) => {
				admin.password = hash;
				next();
			});
		});
	} else {
		next();
	}
})

// A static method on the document model.
// Allows us to find a admin document by comparing the hashed password
//  to a given one, for example when logging in.
AdminSchema.statics.findByUserNamePassword = function(username, password) {
	const admin = this // binds this to the admin model

	// First find the admin by their username
	return admin.findOne({ username: username }).then((admin) => {
		if (!admin) {
			return Promise.reject("Username Not Found")  // a rejected promise
		}
		// if the admin exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, admin.password, (err, result) => {
				if (result) {
					resolve(admin)
				} else {
					reject("Wrong Password")
				}
			})
		})
	})
}

// Make a model using the admin schema
const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
