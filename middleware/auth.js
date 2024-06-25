const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
