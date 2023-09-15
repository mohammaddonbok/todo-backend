
const { response } = require('express')
const Tasks = require('../models/tasks.model')

//Get All Tasls
module.exports.getAllTasks =  async (req ,res) => {
    try {
        const tasks = await Tasks.find()
        if(tasks == null){
            res.json({message:"Task Not Found"})
        }
        res.json(tasks)
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
}

//Get Task By Id
module.exports.getTaskById = async (req,res) =>{
    let response
    response = await getTask(req,res)
    res.json(response)
}

//Create Task
module.exports.createTask = async (req,res) => {
    const task = new Tasks({
        title: req.body.title,
        description: req.body.description,
        state : 'toDo'
    })
    try{
        const newTask = await task.save();
        res.status(200).json(newTask)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
}
 //Update Task
 module.exports.updateTask = async (req, res) => {
    
    
}

// Delete Task
module.exports.deleteTaskById = async (req, res) => {
    try {
        await Tasks.deleteOne({_id:req.params.id})
        res.status(200).json({message:"Task Deleted"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }   
}

async function getTask(req, res , next){
    let task
    try{
        task =await Tasks.findById(req.params.id)
        if(task == null){
            return res.status(404).json({message: 'Cannot find task'})
        }
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
    console.log(task)
    return task
}