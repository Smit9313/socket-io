const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// routes
const taskRoutes = require("./routes/task")
// const friendRoutes = require('./routes/friend');
const { errorHandler } = require("./util/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());


app.use('/task', taskRoutes);

app.use(errorHandler);


mongoose.connect(`${process.env.MONGO_URL}`).then(result => {
	const server = app.listen(process.env.PORT, () => {
		console.log(`Server is running on port ${process.env.PORT}`);
	});
	const io = require("./util/socket").init(server);
	io.on("connection", (socket) => {
		console.log("Client Connected")
	})
}).catch(err => console.log(err));

