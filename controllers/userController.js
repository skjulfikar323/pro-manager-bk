const User = require('../models/User');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error registering user', error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("email: "+ email, " / ", "password: "+ password);
        const user = await User.findOne({ email });
        console.log("user: "+ user);
        if (!user || !(await user.isPasswordValid(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
        res.json({ token, user: { username: user.username, email: user.email } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const { _id } = req.params;

        const user = await User.findOne({ _id });
        if (!user) {
            return res.status(404).json({ 
                essage: 'User not found' 
            });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ 
            message: 'Error fetching user details', 
            error: err.message 
        });
    }
};

exports.updateSetting = async(req, res) =>{ 
    try {
        const { _id, username, oldPassword, newPassword } = req.body;
        console.log("username: " + username, " / ", "Old Password: " + oldPassword, " / ", "New Password: " + newPassword);

        const user = await User.findOne({ _id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                message: 'Incorrect old password' 
            });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await User.findOneAndUpdate({ username }, { password: hashedNewPassword });

        res.status(200).json({ 
            message: 'User password updated successfully' 
        });
    } catch (err) {
        res.status(400).json({ 
            message: 'Error changing user password', 
            error: err.message 
        });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const { _id } = req.params;

        const user = await User.findOneAndDelete({ _id });
        if (!user) {
            return res.status(404).json({ 
                message: 'User not found' 
            });
        }
        res.status(200).json({ 
            message: 'User deleted successfully' 
        });
    } catch (err) {
        res.status(400).json({ 
            message: 'Error deleting user', 
            error: err.message 
        });
    }
};