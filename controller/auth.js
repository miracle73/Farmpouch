const jwt = require('jsonwebtoken')
const errorHandler = require('../error/customError')
const User = require('../models/users')
var users
const success = async (req, res) => {
    const data = {
        name: req.user._json.name,
        email: req.user._json.email,
        email_verified: req.user._json.email_verified
    };
    users = await User.create(data)
    console.log(req.user.id)
    res.status(200).json({ users });
    // return res.status(200).redirect('/api/v1/users/login');
}
const error = async (req, res) => {
    res.send("error logging in")
}
const logout = async (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(); }
        // res.redirect('/api/v1/users/login')
        res.status(200).json({ msg: 'Successfully logged out' })
    });
}
const login = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const token = jwt.sign({ username, password }, process.env.JWT_SECRET, { expiresIn: '1d' })
    if (users) {
        const secondUser = await User.findOne({
            where: {
                id: users.id
            }
        })
           if(secondUser.username === null || secondUser.password === null ) {
            const data = { username, password }
            const thirdUser = await User.update(data, {
                where: {
                    id: secondUser.id
                }
            })
            console.log(secondUser.id)
            res.status(200).json({ msg: 'Successfully signed in for the first time', token})
            
           }
    }
    res.status(200).json({ msg: 'Successfully signed in' , token})

}
module.exports = { success, error, logout, login }