const Task = require("../model/task")
const io = require("../util/socket")
exports.addTask = async (req, res) => {
	const { task } = req.body;

	// Create a new user
	const newTask = new Task({ task });

	// Save the user to the database
	await newTask.save();

	io.getIO().emit('tasks', { action: "create", task: newTask })
	res.status(201).json({ message: 'Task added successfully', task: newTask })

}

exports.getTasks = async (req, res) => {
	const tasks = await Task.find();
	res.status(200).json({ message: 'Success!', tasks })
}

exports.deleteTask = async (req, res) => {
	const id = req.params.id;

	const task = await Task.findOne({ _id: id })

	if (task) {
		await Task.deleteOne({ _id: id });
	} else {
		throw new Error("task not found!")
	}


	io.getIO().emit('tasks', { action: "delete", task })
	res.status(201).json({ message: 'Task delete successfully', task })
}