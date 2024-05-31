const ErrorHandler = require('./../utilities/errorHandler')
const User = require('./../models/user')
const { where } = require('sequelize')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const mysecret = 'myultrasecretcode'

exports.register = async(req, res, next)=>{
    try {
        let { username, password } = req.body
        if(!username || !password){
            return next(new ErrorHandler('Please provide valid input'))
        }
        const user = await User.findOne({where: {'username': username}})
        password = await bcrypt.hash(password, 10);
        if(user && user.id){
            return next(new ErrorHandler('User already exist', 409))
        }

        const createdUser = await User.create({username, password})
        if(createdUser && createdUser.id){
            res.json({
                success: true,
                data: createdUser.dataValues
            })
        }else{
            return next(new ErrorHandler('Faild to create user', 500))
        }
    } catch (error) {
        return next(error)
    }  
}

exports.login = async(req, res, next)=>{
    try {
      const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return next(new ErrorHandler('User not found', 404))
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new ErrorHandler('Invalid credentials', 400));
        }

        const token = jwt.sign({ userId: user.id }, mysecret, { expiresIn: '30m' });
        res.json({
            success: true,
            data: user.dataValues,
            token: token
        })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}