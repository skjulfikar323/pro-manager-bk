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

exports.getProfile = (req, res) => {
    res.json({ user: req.user });
};
