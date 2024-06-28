const mongoose = require('mongoose');

// Define the job task schema
const jobTaskSchema = new mongoose.Schema({
    taskId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['backlog', 'todo', 'inprogress', 'done'],
        default: 'todo'
    },
    assignedTo: {
        type: String,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

// Create and export the job task model
const JobTask = mongoose.model('JobTask', jobTaskSchema);
module.exports = JobTask;
