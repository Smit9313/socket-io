const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
	id:{
		type:Number,
	},
	task: {
		type: String,
		maxlength: 32,	
		required: true,
		uppercase: true, // Convert to uppercase before saving
	}
})

const Task = mongoose.model('Task',tasksSchema)

module.exports = Task