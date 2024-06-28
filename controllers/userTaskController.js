const User = require('../models/User');
const JobTask = require('../models/userJobTask');

exports.getAllTask = async (req, res) => {
    try {        
        const jobTasks = await JobTask.find({});
        res.status(201).json({ 
            data: jobTasks
        });
    } catch (err) {
        res.status(400).json({ 
            message: 'Error creating task', 
            error: err.message 
        });
    }
};

exports.getAllTaskById = async (req, res) => {
    try {
        const { taskId } = req.body;

        const jobTask = await JobTask.findOne({ taskId });
        console.log(jobTask);
        if (!jobTask) {
            return res.status(404).json({ 
                message: 'User not found' 
            });
        }
        res.status(201).json({ 
            data: jobTask
        });
    } catch (err) {
        res.status(400).json({ 
            message: 'Error creating task', 
            error: err.message 
        });
    }
};

exports.getAllTaskByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const start = new Date(startDate);
        const end = new Date(endDate);

        const getData = await JobTask.find({
            createdAt: {
                $gte: start,
                $lte: end
            }
        });

        res.status(201).json({ 
            data: getData
        });
    } catch (err) {
        res.status(400).json({ 
            message: 'Error creating task', 
            error: err.message 
        });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { taskId, title, description, assignedTo } = req.body;

        const newJobTask = new JobTask({ taskId, title, description, assignedTo });
        await newJobTask.save();
        res.status(201).json({ 
            message: 'Task created successfully' 
        });
    } catch (err) {
        res.status(400).json({ 
            message: 'Error creating task', 
            error: err.message 
        });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { taskId, title, description, status, assignedTo } = req.body;

        const jobTask = await JobTask.findOne({ taskId });
        if (!jobTask) {
            return res.status(404).json({ message: 'Job task not found' });
        }

        jobTask.title = title;
        jobTask.description = description;
        jobTask.status = status;
        jobTask.assignedTo = assignedTo;
        jobTask.updatedAt = Date.now();

        await jobTask.save();
        
        res.status(201).json({ 
            message: 'Task updated successfully' 
        });
    } catch (err) {
        res.status(400).json({ 
            message: 'Error updating task', 
            error: err.message 
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const jobTask = await JobTask.findOneAndDelete({ taskId });
        if (!jobTask) {
            return res.status(404).json({ 
                message: 'Task not found' 
            });
        }
        res.status(200).json({ 
            message: 'Task deleted successfully' 
        });
    } catch (err) {
        res.status(400).json({ 
            message: 'Error deleting task', 
            error: err.message 
        });
    }
};
