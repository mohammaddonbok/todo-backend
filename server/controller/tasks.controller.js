
const Tasks = require('../models/tasks.model')

//Get All Tasks
module.exports.getAllTasks =  async (req ,res) => {
    try {
        let tasks
        var status = req.query.status;
        if(status == "done"){
            tasks = await Tasks.find({state: "done"})
        }
        else{
            tasks = await Tasks.find({state:{$ne:"done"}})
        }
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
    let task
    task = await getTask(req,res)
    res.json(task)
}

//Create Task
module.exports.createTask = async (req,res) => {
    const task = new Tasks({
        title: req.body.title,
        description: req.body.description,
        state : 'toDo'
    })
    try{
        await task.save();
        res.status(200).json({message:"New Task Created"})
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
}
 //Update Task
 module.exports.updateTask = async (req, res) => {
    let task = await getTask(req,res)
    if(req.body.title != null){
        task.title = req.body.title
    }
    if(req.body.description != null){
        task.description = req.body.description
    }
    if(req.body.state != null){
        task.state = req.body.state
    }
    try{
        const updatedTask = await task.save()
        res.json(updatedTask)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
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
    return task
}