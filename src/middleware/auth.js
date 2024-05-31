const jwt = require('jsonwebtoken');
const ErrorHandler = require('./../utilities/errorHandler')
const User = require('./../models/user')

const mysecret = 'myultrasecretcode'



const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return next(new ErrorHandler('Please provide a token', 401));
        }

        const decoded = jwt.verify(token, mysecret);
        const user = await User.findByPk(decoded.userId);

        if (user && user.id) {
            req.user = user;
            return next();
        } else {
            return next(new ErrorHandler('Unauthorized', 401));
        }
        
    } catch (error) {
        return next(error);
    }
};

module.exports = authMiddleware;
