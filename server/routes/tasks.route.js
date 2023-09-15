const express = require('express')

const TasksController = require('../controller/tasks.controller')
module.exports = function(app){
    app.get("/api/task", TasksController.getAllTasks);
    app.get("/api/task/:id", TasksController.getTaskById);
    app.post("/api/task", TasksController.createTask);
    app.put("/api/task/:id", TasksController.updateTask);
    app.delete("/api/task/:id", TasksController.deleteTaskById);
}