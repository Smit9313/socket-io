const express = require("express");
const router = express.Router();

const { addTask, getTasks, deleteTask } = require("../controller/task");
const asyncRouteHandler = require("../util/asyncRouteHandler");

router.get('/', asyncRouteHandler(getTasks))
router.post('/add', asyncRouteHandler(addTask))
router.delete('/delete/:id', asyncRouteHandler(deleteTask))

module.exports = router;