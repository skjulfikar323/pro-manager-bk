const User = require('../models/User');

exports.getAllTask = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
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